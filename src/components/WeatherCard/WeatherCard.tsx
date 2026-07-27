import "../../styles/WeatherCard.css";
import type { Weather } from "../../types/weather";

type WeatherCardProps = {
  weather: Weather;
};

function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <div className="weather-card">
      <h2>
        📍 {weather.city}, {weather.country}
      </h2>

      <div className="temperature">
        {Math.round(weather.temperature_2m)}°C
      </div>

      <div className="details">
        <p>
          💧 Humedad:
          <span>{weather.relative_humidity_2m}%</span>
        </p>

        <p>
          🌬️ Viento:
          <span>{weather.wind_speed_10m} km/h</span>
        </p>
      </div>
    </div>
  );
}

export default WeatherCard;