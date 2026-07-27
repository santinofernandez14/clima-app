export interface ForecastDay {
  date: string;

  weatherCode: number;

  maxTemperature: number;
  minTemperature: number;

  sunrise: string;
  sunset: string;
}

export interface Weather {
  city: string;
  country: string;

  temperature: number;
  humidity: number;
  windSpeed: number;

  apparentTemperature: number;
  weatherCode: number;

  maxTemperature: number;
  minTemperature: number;

  sunrise: string;
  sunset: string;

  forecast: ForecastDay[];
}