import { Link } from 'react-router-dom';
import PageCard from '../components/PageCard';
import navigationData from '../data/navigation.json';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Crack the Machine Coding Interview
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Explore all available pages below
          </p>
        </div>

        {/* Page Cards Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {navigationData.allPages.map((page) => (
            <PageCard key={page.path} page={page} />
          ))}
        </div>

        {/* Quick Navigation */}
        <div className="mt-16 bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Quick Navigation
          </h2>
          <div className="flex flex-wrap gap-3">
            {navigationData.allPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {page.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
