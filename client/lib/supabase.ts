import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseUrl, getSupabaseAnonKey, logConfigStatus } from "./config";

// Initialize Supabase client with defensive checks
let supabase: SupabaseClient | null = null;

try {
  const supabaseUrl = getSupabaseUrl();
  const supabaseAnonKey = getSupabaseAnonKey();

  // Log configuration status
  logConfigStatus();

  if (supabaseUrl && supabaseAnonKey) {
    try {
      supabase = createClient(supabaseUrl, supabaseAnonKey);
      console.log("✅ Supabase client initialized successfully");
    } catch (clientError) {
      console.error("❌ Error creating Supabase client:", clientError);
    }
  } else {
    console.warn("⚠️ Supabase will not work without proper environment variables");
  }
} catch (error) {
  console.error("❌ Error initializing Supabase:", error);
}

// Export null-safe supabase client
export const getSupabaseClient = () => {
  if (!supabase) {
    console.warn("⚠️ Supabase client not initialized. Check your environment variables.");
  }
  return supabase;
};

// Export the supabase instance (may be null if config is invalid)
export { supabase };

// Helper functions for authentication with error handling
export async function signUp(email: string, password: string) {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error("❌ Signup error:", error.message);
      return { data: null, error };
    }
    console.log("✅ Signup successful");
    return { data, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error during signup";
    console.error("❌ Signup exception:", message);
    return { data: null, error: new Error(message) };
  }
}

export async function signIn(email: string, password: string) {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("❌ Login error:", error.message);
      return { data: null, error };
    }
    console.log("✅ Login successful");
    return { data, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error during login";
    console.error("❌ Login exception:", message);
    return { data: null, error: new Error(message) };
  }
}

export async function signOut() {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("❌ Logout error:", error.message);
      return { error };
    }
    console.log("✅ Logout successful");
    return { error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error during logout";
    console.error("❌ Logout exception:", message);
    return { error: new Error(message) };
  }
}

export async function getCurrentUser() {
  try {
    if (!supabase) {
      console.warn("⚠️ Supabase client not initialized");
      return null;
    }
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error("❌ Error getting current user:", error.message);
      return null;
    }
    return user;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error getting user";
    console.error("❌ Exception getting user:", message);
    return null;
  }
}

export async function resetPassword(email: string) {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      console.error("❌ Password reset error:", error.message);
      return { data: null, error };
    }
    console.log("✅ Password reset email sent");
    return { data, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error during password reset";
    console.error("❌ Password reset exception:", message);
    return { data: null, error: new Error(message) };
  }
}

// Helper functions for database operations with error handling
export async function getUserProfile(userId: string) {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    if (!userId) {
      throw new Error("User ID is required");
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (error) {
      console.error("❌ Error fetching user profile:", error.message);
    }
    return { data: data || null, error };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error fetching profile";
    console.error("❌ Exception fetching profile:", message);
    return { data: null, error: new Error(message) };
  }
}

export async function updateUserProfile(userId: string, updates: any) {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    if (!userId) {
      throw new Error("User ID is required");
    }
    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();
    if (error) {
      console.error("❌ Error updating profile:", error.message);
    } else {
      console.log("✅ Profile updated successfully");
    }
    return { data: data || null, error };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error updating profile";
    console.error("❌ Exception updating profile:", message);
    return { data: null, error: new Error(message) };
  }
}

export async function saveGameHistory(userId: string, gameData: any) {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    if (!userId) {
      throw new Error("User ID is required");
    }
    const { data, error } = await supabase.from("game_history").insert([
      {
        user_id: userId,
        ...gameData,
        created_at: new Date().toISOString(),
      },
    ]);
    if (error) {
      console.error("❌ Error saving game history:", error.message);
    } else {
      console.log("✅ Game history saved");
    }
    return { data: data || null, error };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error saving game";
    console.error("❌ Exception saving game:", message);
    return { data: null, error: new Error(message) };
  }
}

export async function getGameHistory(userId: string) {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    if (!userId) {
      throw new Error("User ID is required");
    }
    const { data, error } = await supabase
      .from("game_history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    if (error) {
      console.error("❌ Error fetching game history:", error.message);
    }
    return { data: data || [], error };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error fetching history";
    console.error("❌ Exception fetching history:", message);
    return { data: [], error: new Error(message) };
  }
}

export async function getLeaderboard(limit: number = 100) {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    const { data, error } = await supabase
      .from("profiles")
      .select("id, username, high_score, level, total_games")
      .order("high_score", { ascending: false })
      .limit(limit);
    if (error) {
      console.error("❌ Error fetching leaderboard:", error.message);
    }
    return { data: data || [], error };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error fetching leaderboard";
    console.error("❌ Exception fetching leaderboard:", message);
    return { data: [], error: new Error(message) };
  }
}

export async function getStatistics(userId: string) {
  try {
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }
    if (!userId) {
      throw new Error("User ID is required");
    }
    const { data, error } = await supabase
      .from("game_history")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      console.error("❌ Error fetching statistics:", error.message);
    }
    return { data: data || [], error };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error fetching stats";
    console.error("❌ Exception fetching stats:", message);
    return { data: [], error: new Error(message) };
  }
}
