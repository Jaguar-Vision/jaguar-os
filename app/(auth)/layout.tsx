'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentSession, getCurrentUserProfile, signOut } from '@/lib/auth';

// Which roles may open each page. Pages not listed here are open to any logged-in user.
const ROUTE_ROLES: Record<string, string[]> = {
  '/tasks': ['client'],
  '/work': ['va', 'senior_va'],
  '/admin': ['admin'],
};

// Where each role belongs after login or when it opens a page it isn't allowed to see.
function homeFor(role?: string) {
  if (role === 'va' || role === 'senior_va') return '/work';
  if (role === 'admin') return '/admin';
  return '/tasks';
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;
    setChecking(true);

    (async () => {
      const session = await getCurrentSession();
      if (!session) {
        router.replace('/login');
        return;
      }

      const profile = await getCurrentUserProfile();
      if (!active) return;

      if (!profile) {
        router.replace('/login');
        return;
      }

      const allowed = ROUTE_ROLES[pathname];
      if (allowed && !allowed.includes(profile.role)) {
        router.replace(homeFor(profile.role));
        return;
      }

      setEmail(profile.email);
      setRole(profile.role);
      setChecking(false);
    })();

    return () => {
      active = false;
    };
  }, [router, pathname]);

  async function handleLogout() {
    await signOut();
    router.replace('/login');
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const navItems = [
    { href: '/tasks', label: 'Tasks' },
    { href: '/work', label: 'Work' },
    { href: '/admin', label: 'Admin' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Jaguar OS</h1>
            <p className="text-sm text-gray-600">Virtual Assistant Platform</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{email}</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
        <nav className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`py-4 px-1 border-b-2 text-sm font-medium ${
                  pathname === item.href
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-700 hover:border-blue-500'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}