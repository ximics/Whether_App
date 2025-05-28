import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="text-2xl font-bold text-blue-600">WeatherApp</Link>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Inicio</Link>
        <Link to="/favorites" className="text-gray-700 hover:text-blue-600">Favoritos</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
      </div>
    </nav>
  );
}
