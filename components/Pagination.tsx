'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      {currentPage > 1 && (
        <Link
          href={`/doctors?page=${currentPage - 1}`}
          className="flex items-center px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </Link>
      )}

      <span className="text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={`/doctors?page=${currentPage + 1}`}
          className="flex items-center px-4 py-2 bg-white border rounded-md hover:bg-gray-50"
        >
          Next
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      )}
    </div>
  );
} 