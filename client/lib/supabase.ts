import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase configuration. Please check your environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for authentication
export async function signUp(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
}

// Helper functions for database operations
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
}

export async function updateUserProfile(userId: string, updates: any) {
  const { data, error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", userId)
    .select()
    .single();
  return { data, error };
}

export async function saveGameHistory(userId: string, gameData: any) {
  const { data, error } = await supabase.from("game_history").insert([
    {
      user_id: userId,
      ...gameData,
      created_at: new Date().toISOString(),
    },
  ]);
  return { data, error };
}

export async function getGameHistory(userId: string) {
  const { data, error } = await supabase
    .from("game_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function getLeaderboard(limit: number = 100) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, high_score, level, total_games")
    .order("high_score", { ascending: false })
    .limit(limit);
  return { data, error };
}

export async function getStatistics(userId: string) {
  const { data, error } = await supabase
    .from("game_history")
    .select("*")
    .eq("user_id", userId);
  return { data, error };
}
