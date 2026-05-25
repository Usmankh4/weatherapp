import { celsiusToFahrenheit } from '../utils/celsiusConverter';
import { iconUrl } from '../utils/urlBuilder';

function formatDayLabel(dateString) {
  const date = new Date(dateString + 'T12:00:00');
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tmrw';

  return date.toLocaleDateString('en-US', { weekday: 'short' });
}

function ForeCast({ day, unit }) {
  const { date, high, low, icon, description } = day;

  const highTemp = unit === 'F' ? celsiusToFahrenheit(high) : high;
  const lowTemp = unit === 'F' ? celsiusToFahrenheit(low) : low;

  return (
    <article className="forecast-card">
      <span className="forecast-day">{formatDayLabel(date)}</span>
      <img
        className="forecast-icon"
        src={iconUrl(icon)}
        alt={description}
      />
      <div className="forecast-temps">
        <span className="forecast-high">{Math.round(highTemp)}°</span>
        <span className="forecast-low">{Math.round(lowTemp)}°</span>
      </div>
    </article>
  );
}

export default ForeCast;
