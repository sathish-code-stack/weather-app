
import { useState } from "react";
import axios from "axios";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const getWeather = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city)}&appid=${API_KEY}&units=metric`;

      const response = await axios.get(API_URL);

      setWeather(response.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError("City not found. Please enter a valid city name.");
      } else if (err.response?.status === 401) {
        setError("Invalid API key. Please check your API key.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-300 p-4">
      <section className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Weather - App
        </h1>

        <form onSubmit={getWeather} className="flex gap-2 mb-5">
          <input type="text" placeholder="Enter city name" value={city}
            onChange={(e) => setCity(e.target.value)}
            className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-black"/>

          <button type="submit" disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400">
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-center mb-4">
            {error}
          </p>
        )}

        {loading && (
          <p className="text-center text-gray-500">
            Loading weather data...
          </p>
        )}

        {weather && !loading && (
          <div className="text-center">

            <h2 className="text-2xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>

            

            <h3 className="text-5xl font-bold text-blue-600">
              {Math.round(weather.main.temp)}°C
            </h3>

            <p className="capitalize text-gray-600 mt-2">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-500">Feels Like</p>
                <p className="text-xl font-semibold">
                  {Math.round(weather.main.feels_like)}°C
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-500">Humidity</p>
                <p className="text-xl font-semibold">
                  {weather.main.humidity}%
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-500">Wind Speed</p>
                <p className="text-xl font-semibold">
                  {weather.wind.speed} m/s
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-gray-500">Pressure</p>
                <p className="text-xl font-semibold">
                  {weather.main.pressure} hPa
                </p>
              </div>

            </div>
          </div>
        )}

      </section>
    </main>
  );
}

export default Weather;
