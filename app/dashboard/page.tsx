"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentSession, signOut } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getCurrentSession();
        if (!session) {
          router.push("/login");
          return;
        }

        const response = await fetch("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");
        const profile = await response.json();
        setUser(profile);
      } catch (err) {
        console.error("Error:", err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return null;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}</h1>
      <p className="text-gray-600 mb-6">Role: {user.role}</p>
      <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}