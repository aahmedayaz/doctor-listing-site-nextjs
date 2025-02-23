export default function Loading() {
  return (
    <div className="animate-pulse max-w-7xl mx-auto px-4 py-8">
      <div className="h-8 w-32 bg-gray-200 rounded mb-6"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-gray-200 aspect-square rounded-xl"></div>
        <div className="space-y-6 lg:col-span-2">
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-6">
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 