import { useState } from "react";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";
import { getCurrentWeather } from "./api/weatherApi";
import { iconUrl} from "./utils/urlBuilder";
import { celsiusToFahrenheit } from "./utils/celsiusConverter";
function App() {


  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unit, setUnit] = useState("C");
  
  

  async function handleSearch(city) {
    try {
      setIsLoading(true);
      setError("");
      const data = await getCurrentWeather(city);
      setCurrentWeather(data);
    } catch (err) {
      setError(err.message);
      setCurrentWeather(null);
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

       

      {content}
    </div>
  );
}

export default App;
