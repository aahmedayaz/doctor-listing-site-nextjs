import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chats',
  description: 'Secure messaging platform',
};

export default function ChatsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Chats</h1>
      <p className="mt-4 text-gray-600">Secure communication channel</p>
    </div>
  );
} 