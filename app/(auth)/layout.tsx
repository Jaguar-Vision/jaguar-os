'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { getCurrentSession, getCurrentUserProfile, signOut } from '@/lib/auth';

// Which roles may open each page. Pages not listed are open to any logged-in user.
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

const navItems = [
  { href: '/tasks', label: 'Tasks' },
  { href: '/work', label: 'Work' },
  { href: '/admin', label: 'Admin' },
  { href: '/profile', label: 'Profile' },
];

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
      <div className="jo-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p className="jo-eyebrow">Loading</p>
      </div>
    );
  }

  return (
    <div className="jo-shell">
      <header className="jo-header">
        <div className="jo-header-inner">
          <Link href="/tasks" aria-label="Jaguar Vision home">
            <img src="/logo-wordmark.png" alt="Jaguar Vision" className="jo-wordmark" />
          </Link>
          <div className="jo-user">
            <p className="jo-user-email">{email}</p>
            <p className="jo-user-role">{role}</p>
          </div>
          <button onClick={handleLogout} className="jo-btn">
            Logout
          </button>
        </div>
        <nav className="jo-nav">
          <div className="jo-nav-inner">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={pathname === item.href ? 'is-active' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="jo-main">{children}</main>
    </div>
  );
}