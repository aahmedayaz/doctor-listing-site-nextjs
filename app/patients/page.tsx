import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patients',
  description: 'Patient management system',
};

export default function PatientsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Patients</h1>
      <p className="mt-4 text-gray-600">Patient records and management</p>
    </div>
  );
} 