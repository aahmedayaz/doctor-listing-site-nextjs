'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Search, ChevronsUpDown } from 'lucide-react';

export default function DoctorSearchControls() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
      params.set('page', '1');
    } else {
      params.delete('search');
    }
    router.replace(`/doctors?${params.toString()}`);
  };

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', sort);
    params.set('page', '1');
    router.replace(`/doctors?${params.toString()}`);
  };

  return (
    <div className="w-full sm:max-w-md flex gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search doctors..."
          defaultValue={searchParams.get('search')?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 active:border-blue-500"
        />
      </div>

      <div className="relative w-40">
        <select
          value={searchParams.get('sort')?.toString() || 'a-z'}
          onChange={(e) => handleSort(e.target.value)}
          className="w-full pl-4 pr-10 py-2 rounded-lg border bg-white border-gray-300 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="a-z">A to Z</option>
          <option value="z-a">Z to A</option>
        </select>
        <ChevronsUpDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
} 