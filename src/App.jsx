import { useState } from 'react';
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import {getCurrentWeather }from './api/weatherApi';



function App() {

  
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState("");

  async function handleSearch(city){
 try {
      setError("")
      const data = await getCurrentWeather(city);
      setCurrentWeather(data);
    }
    catch(err){
    setError(err.message)
    setCurrentWeather(null);

  }
  }
  

  return (
    <div className="app">
      <Header title = "Weather Dashboard" />
      <SearchForm onSearch={handleSearch}/>
    
      {currentWeather && (
        <div>
          <p>City: {currentWeather.name}</p>
          <p>Temp: {currentWeather.main.temp}</p>
          <p>Humidity: {currentWeather.main.humidity}</p>
          <p> Wind: {currentWeather.wind.speed}</p>
          <p>Description: {currentWeather.weather[0].description}</p>
        </div>
      )}

      {error && <div><p>{error}</p></div>}

      
    </div>
  );
}

export default App;