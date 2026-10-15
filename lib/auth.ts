import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function getCurrentSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getCurrentAuthUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function getCurrentUserProfile() {
  try {
    const session = await getCurrentSession();
    if (!session) return null;

    // Ask the server API for the profile instead of querying the table from the browser.
    // The server uses the service role key, so Row-Level Security doesn't block it.
    const res = await fetch("/api/auth/user", {
      headers: { Authorization: `Bearer ${session.access_token}` },
    });

    if (!res.ok) {
      console.error("Profile API returned status", res.status);
      return null;
    }

    const body = await res.json();
    return body.profile ?? body;
  } catch (err) {
    console.error("getCurrentUserProfile error:", err);
    return null;
  }
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}