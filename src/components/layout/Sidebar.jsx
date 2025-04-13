import { Link, useLocation } from 'react-router-dom';
import navData from '../../data/navigation.json';

export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Menu</h2>
        <nav className="space-y-2">
          {navData.sidebarItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-sm ${
                pathname.startsWith(item.path)
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
