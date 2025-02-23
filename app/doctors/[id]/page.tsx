import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { ChevronLeft } from 'lucide-react';
import { Suspense } from 'react';
import Loading from './loading';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const { id } = await params;

  const { data: doctor } = await supabase
    .from('doctors')
    .select('*')
    .eq('id', id)
    .single();

  return {
    title: `Dr. ${doctor?.full_name} - Profile`,
    description: doctor?.bio,
  };
}

async function getDoctorById(id: string) {
  const { data: doctor, error } = await supabase
    .from('doctors')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return doctor;
}

export default async function DoctorPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const doctor = await getDoctorById(id);
  console.log(doctor)

  if (!doctor) return <div>Doctor not found</div>;

  return (
    <Suspense fallback={<Loading />}>
      <main className="max-w-7xl min-h-screen mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/doctors" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Doctors
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-6">
            {/* Doctor Image */}
            <div className="lg:col-span-1 pb-0">
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={doctor.photo_url}
                  alt={doctor.full_name}
                  width={100}
                  height={100}
                  className="object-cover"
                  priority={true}
                  quality={75}
                  sizes="(max-width: 768px) 100vw, 150px"
                />
              </div>
            </div>

            {/* Doctor Details */}
            <div className="lg:col-span-2 space-y-4 ml-[-150px]">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-1">Dr. {doctor.full_name}</h1>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold">About</h3>
                <p className="text-gray-600 text-base leading-snug mt-[-15px]">{doctor.bio}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-[-160px]">
              {/* Contact Information Card */}
              <div className="card-hover bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-1.152-.26-2.291-.723-3.3C20.85 15.57 22 14.16 22 12.6c0-1.885-.694-3.671-1.94-5.03a8.52 8.52 0 00-.659-5.803A2.25 2.25 0 0016.378 1H15.75c-1.318 0-2.55.47-3.51 1.27-1.64 1.35-3.17 3.44-3.17 5.31 0 1.56.85 2.97 2.22 3.73.19.1.38.19.57.27.12.05.25.08.38.08.23 0 .45-.1.6-.3.12-.15.2-.33.22-.53.03-.25-.05-.5-.2-.7a4.5 4.5 0 01-.5-2.95 6.37 6.37 0 01.9-2.51" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 bg-white/50 backdrop-blur-sm rounded-lg">
                    <div className="p-1.5 bg-white rounded-md shadow-xs">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-1.152-.26-2.291-.723-3.3C20.85 15.57 22 14.16 22 12.6c0-1.885-.694-3.671-1.94-5.03a8.52 8.52 0 00-.659-5.803A2.25 2.25 0 0016.378 1H15.75c-1.318 0-2.55.47-3.51 1.27-1.64 1.35-3.17 3.44-3.17 5.31 0 1.56.85 2.97 2.22 3.73.19.1.38.19.57.27.12.05.25.08.38.08.23 0 .45-.1.6-.3.12-.15.2-.33.22-.53.03-.25-.05-.5-.2-.7a4.5 4.5 0 01-.5-2.95 6.37 6.37 0 01.9-2.51" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Direct Line</p>
                      <p className="text-base font-semibold text-gray-900">{doctor.contact_number}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-2 bg-white/50 backdrop-blur-sm rounded-lg">
                    <div className="p-1.5 bg-white rounded-md shadow-xs">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Visit Us</p>
                      <p className="text-base font-semibold text-gray-900">{doctor.office_address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Card */}
              <div className="card-hover bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Hours</h3>
                </div>

                <div className="space-y-3">
                  <div className="p-2 bg-white/50 backdrop-blur-sm rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Weekdays</span>
                      <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">9AM - 5PM</span>
                    </div>
                  </div>

                  <div className="p-2 bg-white/50 backdrop-blur-sm rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Saturday</span>
                      <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">9AM - 1PM</span>
                    </div>
                  </div>

                  <div className="p-2 bg-white/50 backdrop-blur-sm rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-500">Emergency</span>
                      <span className="px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}

export async function generateStaticParams() {
  const { data: doctors } = await supabase
    .from('doctors')
    .select('id');

  return doctors?.map(({ id }) => ({ id })) || [];
} 