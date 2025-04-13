import { Link, useLocation } from 'react-router-dom';
import navData from '../../data/navigation.json';

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            MyApp
          </Link>

          <div className="flex space-x-4">
            {navData.navbarItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  (
                    item.exact
                      ? pathname === item.path
                      : pathname.startsWith(item.path)
                  )
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
