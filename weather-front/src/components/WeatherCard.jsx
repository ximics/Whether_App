export default function WeatherCard({ weather }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md text-center">
      <h2 className="text-2xl font-semibold mb-2 text-blue-600">{weather.name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="weather icon"
        className="mx-auto"
      />
      <p className="text-xl font-bold mb-1">
        {weather.temperature}°{weather.unit === 'imperial' ? 'F' : 'C'}
      </p>
      <p className="text-gray-600 mb-3 capitalize">{weather.description}</p>
      <div className="flex justify-around text-sm text-gray-500">
        <div>
          <span className="font-medium">Humedad: </span>{weather.humidity}%
        </div>
        <div>
          <span className="font-medium">Viento: </span>
          {weather.wind} {weather.unit === 'imperial' ? 'mph' : 'm/s'}
        </div>
      </div>
    </div>
  );
}
