import "../../styles/CurrentWeather.css";
import type { Weather } from "../../types/weather";
import { getWeatherDescription } from "../../utils/weatherCode";

type CurrentWeatherProps = {
  weather: Weather;
  selectedDay: number;
};

function CurrentWeather({
  weather,
  selectedDay,
}: CurrentWeatherProps) {
  const day = weather.forecast[selectedDay];
  return (
    <div className="current-weather">

      <h2>
        📍 {weather.city}, {weather.country}
      </h2>

      <p className="weather-description">
        {getWeatherDescription(day.weatherCode)}
      </p>

      <div className="temperature">
        {selectedDay === 0
          ? `${Math.round(weather.temperature)}°C`
          : `${Math.round(day.maxTemperature)}° / ${Math.round(day.minTemperature)}°`}
      </div>
      <div className="details">

        {selectedDay === 0 && (
          <p>
            🌡️ Sensación térmica
            <span>{Math.round(weather.apparentTemperature)}°C</span>
          </p>
        )}

        <p>
          📈 Máxima
          <span>{Math.round(day.maxTemperature)}°C</span>
        </p>

        <p>
          📉 Mínima
          <span>{Math.round(day.minTemperature)}°C</span>
        </p>

        {selectedDay === 0 && (
          <p>
            💧 Humedad
            <span>{weather.humidity}%</span>
          </p>
        )}
        {selectedDay === 0 && (
          <p>
            🌬️ Viento
            <span>{weather.windSpeed} km/h</span>
          </p>
        )}
        <p>
          🌅 Amanecer
          <span>{formatHour(day.sunrise)}</span>
        </p>

        <p>
          🌇 Atardecer
          <span>{formatHour(day.sunset)}</span>
        </p>

      </div>

    </div>
  );
}

function formatHour(date: string) {
  return new Date(date).toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default CurrentWeather;