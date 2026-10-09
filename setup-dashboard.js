const fs = require("fs");
const dashboardCode = `"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUserProfile, signOut } from "@/lib/auth";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getCurrentUserProfile();
        setUser(profile);
      } catch (err) {
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

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

  return (
    <div className="p-8">
      <h1>Welcome, {user.email}</h1>
      <p>Role: {user.role}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}`;

fs.writeFileSync("app/dashboard/page.tsx", dashboardCode, "utf8");
console.log("Dashboard created!");
