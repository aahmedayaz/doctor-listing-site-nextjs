import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Departments',
  description: 'Medical department overview',
};

export default function DepartmentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Departments</h1>
      <div className="mt-4 space-y-2">
        {['Cardiology', 'Neurology', 'Pediatrics'].map((dept) => (
          <div key={dept} className="p-4 border rounded-lg">
            {dept}
          </div>
        ))}
      </div>
    </div>
  );
} 