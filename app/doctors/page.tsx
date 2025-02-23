'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';
import { Phone } from 'lucide-react';

interface Doctor {
  id: string;
  photo_url: string;
  full_name: string;
  bio: string;
  office_address: string;
  contact_number: string;
  [key: string]: unknown;
}

function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'a-z' | 'z-a'>('a-z');
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select('*')
        .order('full_name', { ascending: true });

      if (error) {
        console.error('Error fetching doctors:', error);
        setError('Error loading doctors. Please try again later.');
      } else {
        setDoctors(data);
      }
    };

    fetchDoctors();
  }, []);

  // Filter and sort doctors
  const filteredDoctors = doctors?.filter(doctor =>
    doctor.full_name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortOrder === 'a-z') return a.full_name.localeCompare(b.full_name);
    return b.full_name.localeCompare(a.full_name);
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedDoctors = sortedDoctors.slice(startIndex, endIndex);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!doctors) {
    return <div className="text-center p-4">Loading doctors...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-4 pt-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Medical Team</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
            className="flex-1 border rounded-lg px-4 py-2 bg-white text-sm focus:outline-none"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'a-z' | 'z-a')}
            className="border rounded-lg px-4 py-2 text-sm focus:outline-none bg-white"
          >
            <option value="a-z">Sort A-Z</option>
            <option value="z-a">Sort Z-A</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-3 h-[calc(100vh-180px)] overflow-y-auto pb-10">
        {paginatedDoctors.map((doctor, index) => (
          <Link
            href={`/doctors/${doctor.id}`}
            prefetch={true}
            key={doctor.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl border transition-shadow flex items-center p-4 cursor-pointer h-24 relative group mb-2"
          >
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = `tel:${doctor.contact_number}`;
              }}
              className="absolute right-3 top-3 flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full text-xs transition-opacity opacity-100"
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </button>
            <Image
              src={doctor.photo_url}
              alt={doctor.full_name}
              width={80}
              height={80}
              className="object-cover w-14 h-14 rounded-lg mr-4"
              quality={60}
              priority={index < 3}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
            />
            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-lg font-bold text-gray-800 line-clamp-1">
                  {doctor.full_name}
                </h2>
                <p className="text-gray-600 text-xs line-clamp-2 mt-[-3]">
                  {doctor.bio}
                </p>
              </div>
              <div className="flex justify-between text-xs mt">
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="line-clamp-1">{doctor.office_address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{doctor.contact_number}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pt-4 text-black absolute bottom-[20px] left-[50%]">
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 text-sm"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm">
            Page {currentPage} of {Math.ceil(sortedDoctors.length / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={endIndex >= sortedDoctors.length}
            className="px-4 py-2 bg-gray-100 rounded-lg disabled:opacity-50 hover:bg-gray-200 text-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DoctorsPage() {
  return <DoctorList />;
}