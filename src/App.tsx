import { useState } from "react";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Loading from "./components/Loading/Loading";

import "./styles/globals.css";

import type { Weather } from "./types/weather";
import Forecast from "./components/Forecast/Forecast";

function App() {

  const [weather, setWeather] = useState<Weather | null>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [loading, setLoading] = useState(false);

  return (

    <div className="app">

      <Header />

      <main className="container">

        <SearchBar setWeather={setWeather} setLoading={setLoading} loading={loading} setSelectedDay={setSelectedDay} />
        {
          loading && <Loading />
        }

        {weather && !loading && (
          <>
            <CurrentWeather
              weather={weather}
              selectedDay={selectedDay}
            />

            <Forecast
              forecast={weather.forecast}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}

            />
          </>

        )}

      </main>

    </div>

  );

}

export default App;