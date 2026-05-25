import { useEffect, useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import { getCurrentWeather, getForecast } from "./api/weatherApi";
import { iconUrl } from "./utils/urlBuilder";
import { celsiusToFahrenheit } from "./utils/celsiusConverter";
import { transformForecastList } from './utils/forecastList';
import ForeCast from "./components/ForeCast";

function formatCurrentDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [forecast, setForecast] = useState([]);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  async function handleSearch(city) {
    try {
      setIsLoading(true);
      setError("");
      const data = await getCurrentWeather(city);
      const forecastData = await getForecast(city);
      const cleanForecastData = transformForecastList(forecastData.list);
      setForecast(cleanForecastData);
      setCurrentWeather(data);
      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle('dark', theme === 'dark');
    return () => document.body.classList.remove('dark');
  }, [theme]);

  useEffect(() => {
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      handleSearch(savedCity);
    }
  }, []);

  function handleToggle() {
    setUnit(prev => prev === "C" ? "F" : "C");
  }

  function handleThemeToggle() {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }

  return (
    <div className="app">
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      <SearchForm onSearch={handleSearch} isLoading={isLoading} />

      {isLoading && (
        <div className="status-message loading" role="status">
          <div className="loading-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <p>Fetching forecast</p>
        </div>
      )}

      {!isLoading && error && (
        <p className="error-message" role="alert">{error}</p>
      )}

      {!isLoading && !error && !currentWeather && (
        <p className="status-message">Enter a city to see current conditions and a 5-day outlook.</p>
      )}

      {!isLoading && !error && currentWeather && (
        <section className="weather-panel" aria-label="Current weather">
          <article className="weather-card">
            <div className="weather-card-header">
              <div className="weather-location">
                <h2 className="weather-city">{currentWeather.name}</h2>
                <time className="weather-date" dateTime={new Date().toISOString().split('T')[0]}>
                  {formatCurrentDate()}
                </time>
              </div>
              <button type="button" className="unit-toggle" onClick={handleToggle}>
                °{unit === 'C' ? 'F' : 'C'}
              </button>
            </div>

            <div className="weather-main">
              <div className="weather-temp-block">
                <span className="weather-temp">
                  {Math.round(unit === 'F'
                    ? celsiusToFahrenheit(currentWeather.main.temp)
                    : currentWeather.main.temp)}
                </span>
                <span className="weather-unit">°{unit}</span>
              </div>
              <div className="weather-icon-wrap">
                <img
                  src={iconUrl(currentWeather.weather[0].icon)}
                  alt={currentWeather.weather[0].description}
                />
              </div>
              <p className="weather-description">{currentWeather.weather[0].description}</p>
            </div>

            <div className="weather-stats">
              <div className="stat">
                <span className="stat-label">Humidity</span>
                <span className="stat-value">{currentWeather.main.humidity}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">Wind</span>
                <span className="stat-value">{currentWeather.wind.speed} m/s</span>
              </div>
            </div>
          </article>

          {forecast.length > 0 && (
            <section className="forecast-section" aria-label="5-day forecast">
              <h3 className="forecast-heading">Next 5 days</h3>
              <div className="forecast-list">
                {forecast.map((day) => (
                  <ForeCast key={day.date} day={day} unit={unit} />
                ))}
              </div>
            </section>
          )}
        </section>
      )}
    </div>
  );
}

export default App;
