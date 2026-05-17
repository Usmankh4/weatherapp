const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getCurrentWeather(city){
    const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if(!response.ok){
        throw new Error('City not found!');
    }
    const data = await response.json();
    console.log('Weather Data:',data);
    return data;
}