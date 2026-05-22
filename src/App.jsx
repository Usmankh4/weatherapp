import { useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import { getCurrentWeather, getForecast } from "./api/weatherApi";
import { iconUrl} from "./utils/urlBuilder";
import { celsiusToFahrenheit } from "./utils/celsiusConverter";
import { transformForecastList } from './utils/forecastList';
import ForeCast from "./components/ForeCast";

function App() {


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  const [forecast, setForecast] = useState([]);

  
  
  
  async function handleSearch(city) {
    try {
      setIsLoading(true);
      setError("");
      const data = await getCurrentWeather(city);
      const forecastData = await getForecast(city);
      const cleanForecastData = transformForecastList(forecastData.list);
      setForecast(cleanForecastData);
      setCurrentWeather(data);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  }

  function handleToggle(){
    setUnit(prev => prev === "C" ? "F": "C");
  }
  
  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = (
      <div>
        <p>{error}</p>
      </div>
    );
  } else if (currentWeather) {
    const iconCode = currentWeather.weather[0].icon;
    const iconUrlImage = iconUrl(iconCode)
    const description = currentWeather.weather[0].description;
    const celsiusTemperature = currentWeather.main.temp;
    const displayTemperature = unit === 'F' ? celsiusToFahrenheit(celsiusTemperature) : celsiusTemperature;

    content = (
      <div>
        <p>City: {currentWeather.name}</p>
        <p>Temperature: {Math.round(displayTemperature)}°{unit}</p>
        <img src={iconUrlImage} alt={description}/>
        <p>Humidity: {currentWeather.main.humidity}%</p>
        <p> Wind: {currentWeather.wind.speed} m/s</p>
        <p>Description: {currentWeather.weather[0].description}</p>
      </div>
    );
  } else {
    content = <p>Search for a city to see the weather</p>;
  }

  return (
    <div className="app">
      <Header title="Weather Dashboard" />
      <SearchForm onSearch={handleSearch} />
    
      

        {currentWeather && !isLoading && !error && (
          <button onClick={handleToggle}>
             Show °{unit === 'C' ? 'F': 'C'}
             </button>
        )}

        {forecast.length > 0 && !isLoading && !error && (
          <div>
            <h1>5-Day Forecast</h1>
            {forecast.map((day) =>(
              <ForeCast key={day.date} forecast={day} unit={unit} />
            )
          )}
          </div>
        )}
      {content}
    </div>
  );
}

export default App;
