import { useState } from 'react';

const fakeCities = [
  'Madrid', 'Barcelona', 'Sevilla', 'Valencia', 'Bilbao', 'Málaga',
  'Zaragoza', 'Granada', 'Alicante', 'Córdoba', 'Valladolid', 'Murcia'
].sort(); // orden alfabético

export default function CitySearchDropdown({ onCitySelect }) {
  const [query, setQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredCities = fakeCities.filter(city =>
    city.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (city) => {
    setQuery('');
    setShowDropdown(false);
    onCitySelect(city);
  };

  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Buscar ciudad..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {showDropdown && (
        <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto z-50 shadow-lg">
          {filteredCities.length > 0 ? (
            filteredCities.map((city, i) => (
              <li
                key={i}
                onClick={() => handleSelect(city)}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
              >
                {city}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 italic">Ciudad no encontrada</li>
          )}
        </ul>
      )}
    </div>
  );
}
