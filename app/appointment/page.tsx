import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Appointments',
  description: 'Manage patient appointments',
};

export default function AppointmentPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Appointments</h1>
      <p className="mt-4 text-gray-600">Schedule and manage appointments</p>
    </div>
  );
} 