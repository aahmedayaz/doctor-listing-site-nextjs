'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  Stethoscope,
  CalendarCheck,
  LayoutGrid,
  Users,
  MessageSquare,
  LifeBuoy,
  Settings,
  Menu,
  X,
  HeartPulse
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/doctors', icon: Stethoscope, label: 'Doctors' },
    { href: '/appointment', icon: CalendarCheck, label: 'Appointment' },
    { href: '/departments', icon: LayoutGrid, label: 'Departments' },
    { href: '/patients', icon: Users, label: 'Patients' },
    { href: '/chats', icon: MessageSquare, label: 'Chats' },
    { href: '/support', icon: LifeBuoy, label: 'Support' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <nav className={`h-[100vh] w-[300px] bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 z-40 fixed left-0 top-0 flex-shrink-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

        {/* Logo */}
        <div className="flex justify-center py-6 border-b">
          <HeartPulse className="h-12 w-12 text-primary" />
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col justify-between h-[calc(100%-120px)]">
          <div className="p-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="p-4 border-t">
            <Button className="w-full gap-3">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
} 