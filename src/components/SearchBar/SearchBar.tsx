import { useState } from "react";
import "../../styles/SearchBar.css";
import { getWeather } from "../../services/weatherApi";
import { getWeatherByLocation } from "../../services/weatherApi";
import type { Weather } from "../../types/weather";

type SearchBarProps = {

    setWeather: React.Dispatch<
        React.SetStateAction<Weather | null>
    >;

    setLoading: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    loading: boolean;
    setSelectedDay: React.Dispatch<
    React.SetStateAction<number>
>;

};



function SearchBar({
    setWeather,
    setLoading,
    loading,
    setSelectedDay,
}: SearchBarProps) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;

    setCity(value);

    setError("");

    if (value.trim() === "") {

        setWeather(null);

    }

}
  const handleSearch = async () => {
    // Validar campo vacío
    if (city.trim() === "") {
      setError("Debe ingresar una ciudad.");
      return;
    }

    

    // Validar solo letras y espacios
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;

    if (!regex.test(city)) {
      setError("La ciudad solo puede contener letras.");
      return;
    }

    

    try {
      setError("");
      setLoading(true);

      const weatherData = await getWeather(city);

      setWeather(weatherData);
      setSelectedDay(0);

      

      // Opcional: limpiar el input después de buscar
      // setCity("");

    } catch (error) {
      setError("Ciudad no encontrada.");
    } finally {
      setLoading(false);
    }
  };

  const handleLocation = () => {

  if (!navigator.geolocation) {

    setError("Tu navegador no soporta ubicación.");

    return;

  }


  setLoading(true);


  navigator.geolocation.getCurrentPosition(

    async (position) => {

      try {

        const data = await getWeatherByLocation(
          position.coords.latitude,
          position.coords.longitude
        );


        setWeather(data);

        setSelectedDay(0);


      } catch(error) {
        console.log(error)
        setError("No se pudo obtener el clima.");

      }
      finally {

        setLoading(false);

      }

    },


    () => {

      setError(
        "Permiso de ubicación rechazado."
      );

      setLoading(false);

    }

  );

};

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={city}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

     <button
     onClick={handleSearch}
      disabled={loading}
>

      {loading ? "Buscando..." : "Buscar"}

</button>
<button
  className="location-button"
  onClick={handleLocation}
  disabled={loading}
>
  📍 Mi ubicación
</button>

      {error && (
        <p className="error">
          {error}
        </p>
      )}
    </div>
  );
}

export default SearchBar;