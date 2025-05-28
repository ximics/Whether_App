import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import LoadingSpinner from '../components/LoadingSpinner';
import HourlyChart from '../components/HourlyChart';
import DailyForecastList from '../components/DailyForecastList';

const fakeCities = [
  'Madrid', 'Barcelona', 'Sevilla', 'Valencia', 'Bilbao', 'Málaga',
  'Zaragoza', 'Granada', 'Alicante', 'Córdoba', 'Valladolid', 'Murcia'
].sort();

export default function Home() {
  const [city, setCity] = useState('');
  const [fakeWeather, setFakeWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unit, setUnit] = useState('metric'); // 'metric' para °C, 'imperial' para °F

  const dropdownRef = useRef();

  const filteredCities = fakeCities.filter(c =>
    c.toLowerCase().includes(city.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCityClick = (selectedCity) => {
    setCity(selectedCity);
    setShowDropdown(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    setFakeWeather(null);

    try {
      const res = await axios.get(`http://localhost:5000/api/weather/${city}?units=${unit}`);
      setFakeWeather({ ...res.data, unit });
    } catch (error) {
      console.error(error);
      alert('Ciudad no encontrada o error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-blue-700">Consulta el clima</h1>

      {/* Selector de unidades */}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setUnit('metric')}
          className={`px-3 py-1 rounded-md border ${
            unit === 'metric' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          } hover:bg-blue-100 transition`}
        >
          °C / m/s
        </button>
        <button
          type="button"
          onClick={() => setUnit('imperial')}
          className={`px-3 py-1 rounded-md border ${
            unit === 'imperial' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
          } hover:bg-blue-100 transition`}
        >
          °F / mph
        </button>
      </div>

      {/* Buscador con dropdown */}
      <form onSubmit={handleSearch} className="relative w-full max-w-md mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div ref={dropdownRef} className="relative w-full">
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Introduce una ciudad..."
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            />

            {showDropdown && (
              <ul className="absolute z-10 top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                {filteredCities.length > 0 ? (
                  filteredCities.map((cityName, i) => (
                    <li
                      key={i}
                      onClick={() => handleCityClick(cityName)}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      {cityName}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-500 italic">Ciudad no encontrada</li>
                )}
              </ul>
            )}
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Buscar
          </button>
        </div>
      </form>

      {loading && <LoadingSpinner />}
      {!loading && fakeWeather && (
        <>
          <WeatherCard weather={fakeWeather} />
          <HourlyChart />
          <DailyForecastList />
        </>
      )}
    </div>
  );
}
