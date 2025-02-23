import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support',
  description: 'Contact support team',
};

export default function SupportPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Support Center</h1>

      {/* Replace PDF Viewer with Google Maps */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Hospital Location</h2>
        <div className="w-full h-[300px] border rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.3289826833346!2d67.03086031554427!3d24.886222984039427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e5b948a86a1%3A0xea9c6d98a8a1c4e0!2sAga%20Khan%20University%20Hospital!5e0!3m2!1sen!2s!4v1624456789012!5m2!1sen!2s"
            className="w-full h-full"
            title="Hospital Location Map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <p>Email: ahmedayaz.business@gmail.com</p>
        <p>24/7 Available: +92-313-2139616</p>
      </div>
    </div>
  );
} 