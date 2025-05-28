import WeatherCard from '../components/WeatherCard';

const mockFavorites = [
  {
    name: 'Madrid',
    temperature: 27,
    description: 'Soleado',
    icon: '01d',
    humidity: 40,
    wind: 9,
  },
  {
    name: 'Barcelona',
    temperature: 22,
    description: 'Parcialmente nublado',
    icon: '03d',
    humidity: 55,
    wind: 12,
  },
];

export default function Favorites() {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Tus Ciudades Favoritas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockFavorites.map((weather, idx) => (
          <WeatherCard key={idx} weather={weather} />
        ))}
      </div>
    </div>
  );
}
