import axios from "axios";

const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

const GEO_REVERSE_URL =
  "https://nominatim.openstreetmap.org/reverse";

export async function getWeather(city: string) {

    // Buscar la ciudad

    const geoResponse = await axios.get(GEO_URL, {

        params: {

            name: city,
            count: 1,
            language: "es",
            format: "json"

        }

    });

    if (!geoResponse.data.results) {

        throw new Error("Ciudad no encontrada.");

    }

    const location = geoResponse.data.results[0];

    // Buscar el clima

    const response = await axios.get(WEATHER_URL, {
        params: {
            latitude: location.latitude,
            longitude: location.longitude,
            current: [
                "temperature_2m",
                "relative_humidity_2m",
                "wind_speed_10m",
                "apparent_temperature",
                "weather_code"
            ].join(","),

            daily: [
                "weather_code",
                "temperature_2m_max",
                "temperature_2m_min",
                "sunrise",
                "sunset"
            ].join(","),
        }
    });


    const weather = response.data;
   const forecast = weather.daily.time.map(
  (date: string, index: number) => ({
    date,
    weatherCode: weather.daily.weather_code[index],
    maxTemperature: weather.daily.temperature_2m_max[index],
    minTemperature: weather.daily.temperature_2m_min[index],
    sunrise: weather.daily.sunrise[index],
    sunset: weather.daily.sunset[index],
  })
);

    console.log(forecast);

    // 👇 Y ACÁ LO DEVOLVÉS
    return {
        city: location.name,
        country: location.country,

        temperature: weather.current.temperature_2m,
        humidity: weather.current.relative_humidity_2m,
        windSpeed: weather.current.wind_speed_10m,
        apparentTemperature: weather.current.apparent_temperature,
        weatherCode: weather.current.weather_code,

        maxTemperature: weather.daily.temperature_2m_max[0],
        minTemperature: weather.daily.temperature_2m_min[0],

        sunrise: weather.daily.sunrise[0],
        sunset: weather.daily.sunset[0],

        forecast


    };

    


}

export async function getWeatherByLocation(
  latitude: number,
  longitude: number
) {
const location = await getCityByCoordinates(
  latitude,
  longitude
);
  const weather = await axios.get(WEATHER_URL, {
    params: {

      latitude,
      longitude,

      timezone: "auto",

      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "wind_speed_10m",
        "apparent_temperature",
        "weather_code"
      ].join(","),

    daily: [
  "weather_code",
  "temperature_2m_max",
  "temperature_2m_min",
  "sunrise",
  "sunset"
].join(",")
    }
  });


  const forecast = weather.data.daily.time.map(
    (date: string, index: number) => ({
      
      date,

      weatherCode:
        weather.data.daily.weather_code[index],

      maxTemperature:
        weather.data.daily.temperature_2m_max[index],

      minTemperature:
        weather.data.daily.temperature_2m_min[index],

      sunrise:
        weather.data.daily.sunrise[index],

      sunset:
        weather.data.daily.sunset[index]

    })
  );


  return {

    city: location.city,
    country: location.country,

    temperature:
      weather.data.current.temperature_2m,

    humidity:
      weather.data.current.relative_humidity_2m,

    windSpeed:
      weather.data.current.wind_speed_10m,

    apparentTemperature:
      weather.data.current.apparent_temperature,

    weatherCode:
      weather.data.current.weather_code,


    maxTemperature:
      weather.data.daily.temperature_2m_max[0],

    minTemperature:
      weather.data.daily.temperature_2m_min[0],

    sunrise:
      weather.data.daily.sunrise[0],

    sunset:
      weather.data.daily.sunset[0],

    forecast

  };

}


export async function getCityByCoordinates(
  latitude: number,
  longitude: number
) {

  const response = await axios.get(GEO_REVERSE_URL, {

    params: {

      lat: latitude,
      lon: longitude,

      format: "json",

      language: "es"

    }

  });


  return {

    city:
      response.data.address.city ||
      response.data.address.town ||
      response.data.address.village ||
      "Ubicación actual",

    country:
      response.data.address.country || ""

  };

}