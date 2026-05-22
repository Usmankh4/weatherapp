import { celsiusToFahrenheit } from '../utils/celsiusConverter';
import {iconUrl} from '../utils/urlBuilder';

function ForeCast({forecast, unit}){

    const { date, high, low,icon, description} = forecast;

    const highTemp = unit === 'F' ? celsiusToFahrenheit(high) : high;
    const lowTemp = unit === 'F' ? celsiusToFahrenheit(low) : low;
    return (
        <div>
            <p>{date}</p>
            <img src={iconUrl(icon)} alt={description}/>
            <p>{Math.round(highTemp)}</p>
            <p>{Math.round(lowTemp)}</p>
            <p>{description}</p>

        </div>
    )
}

export default ForeCast;