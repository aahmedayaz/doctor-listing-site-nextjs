export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-64 mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-md">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto"></div>
            <div className="mt-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6 mx-auto"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 