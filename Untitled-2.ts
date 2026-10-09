app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserProfile, signOut } from "@/lib/auth";

interface UserProfile {
  id: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const profile = await getCurrentUserProfile();
        setUser(profile);
      } catch (err) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Not authenticated</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Jaguar OS</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user.first_name || user.email}!</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Role</p>
              <p className="font-semibold capitalize">{user.role}</p>
            </div>
          </div>

          {user.role === "client" && (
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-bold mb-2">Client Dashboard</h3>
              <p>Projects, tasks, and approvals will appear here.</p>
            </div>
          )}

          {user.role === "va" && (
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-bold mb-2">VA Dashboard</h3>
              <p>Your assigned clients and tasks will appear here.</p>
            </div>
          )}

          {user.role === "admin" && (
            <div className="bg-purple-50 p-4 rounded">
              <h3 className="font-bold mb-2">Admin Dashboard</h3>
              <p>User management, system settings, and analytics will appear here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
