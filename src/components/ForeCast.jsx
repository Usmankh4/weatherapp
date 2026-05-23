import { celsiusToFahrenheit } from '../utils/celsiusConverter';
import {iconUrl} from '../utils/urlBuilder';

function ForeCast({ day, unit }){

    const { date, high, low,icon, description } = day;

    const highTemp = unit === 'F' ? celsiusToFahrenheit(high) : high;
    const lowTemp = unit === 'F' ? celsiusToFahrenheit(low) : low;
    return (
        <div>
            <p>{date}</p>
            <img src={iconUrl(icon)} alt={description}/>
            <p>High: {Math.round(highTemp)} °{unit}</p>
            <p>Low: {Math.round(lowTemp)} °{unit}</p>
            <p>{description}</p>

        </div>
    )
}

export default ForeCast;