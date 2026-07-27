import "../../styles/Forecast.css";
import type { ForecastDay } from "../../types/weather";
import ForecastCard from "../ForecastCard/ForecastCard";
import { useEffect, useRef } from "react";


type ForecastProps = {


  forecast: ForecastDay[];

  selectedDay: number;

  setSelectedDay: React.Dispatch<
    React.SetStateAction<number>
  >;


};


function Forecast({
  forecast,
  selectedDay,
  setSelectedDay,
}: ForecastProps) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
useEffect(() => {

  cardRefs.current[selectedDay]?.scrollIntoView({

    behavior: "smooth",

    inline: "center",

    block: "nearest",

  });

}, [selectedDay]);

  return (
    <section className="forecast">

      <h2>Pronóstico de 7 días</h2>

      <div className="forecast-list">

        {forecast.map((day, index) => (
          <ForecastCard
            key={day.date}

            ref={(element) => {
              cardRefs.current[index] = element;
            }}

            day={day}

            isToday={index === 0}

            isSelected={index === selectedDay}

            onClick={() => setSelectedDay(index)}
          />
        ))}



      </div>


    </section>
  );
}

export default Forecast;