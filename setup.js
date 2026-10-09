const fs = require("fs");
const path = require("path");

const libDir = path.join(__dirname, "lib");
const loginDir = path.join(__dirname, "app/login");

if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true });
if (!fs.existsSync(loginDir)) fs.mkdirSync(loginDir, { recursive: true });

const authCode = `"use client";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

export async function getCurrentAuthUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

export async function getCurrentUserProfile() {
  const authUser = await getCurrentAuthUser();
  if (!authUser) return null;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_id", authUser.id)
    .single();
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}`;

const loginCode = `"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");        
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Jaguar OS</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Test accounts:<br/>
          Client: anastasia@example.com / password123<br/>
          VA: sarah@jaguar-os.local / password123<br/>
          Admin: admin@jaguar-os.local / password123
        </p>
      </div>
    </div>
  );
}`;

fs.writeFileSync(path.join(libDir, "auth.ts"), authCode, "utf8");
fs.writeFileSync(path.join(loginDir, "page.tsx"), loginCode, "utf8");

console.log("Files created successfully!");
