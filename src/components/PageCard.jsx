import { Link } from 'react-router-dom';

export default function PageCard({ page }) {
  return (
    <div
      className={`${page.color} rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300`}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{page.name}</h3>
        <p className="text-gray-600 mb-4">{page.description}</p>
        <Link
          to={page.path}
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Visit Page
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
