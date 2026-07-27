import { forwardRef } from "react";
import "../../styles/ForecastCard.css";
import type { ForecastDay } from "../../types/weather";
import { getWeatherDescription } from "../../utils/weatherCode";

type ForecastCardProps = {
  day: ForecastDay;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
};

const ForecastCard = forwardRef<HTMLDivElement, ForecastCardProps>(
  ({ day, isToday, isSelected, onClick }, ref) => {

    const weekDay = isToday
      ? "Hoy"
      : new Date(`${day.date}T12:00:00`).toLocaleDateString("es-AR", {
          weekday: "short",
        });

    return (
      <div
        ref={ref}
        className={`forecast-card ${isSelected ? "active" : ""}`}
        onClick={onClick}
      >
        <h3>{weekDay}</h3>

        <p className="forecast-icon">
          {getWeatherDescription(day.weatherCode).split(" ")[0]}
        </p>

        <p className="forecast-temp">
          {Math.round(day.maxTemperature)}° / {Math.round(day.minTemperature)}°
        </p>
      </div>
    );
  }
);

export default ForecastCard;