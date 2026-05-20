import { supabase } from "./supabase";

/**
 * User Service - Helper functions for user-related database operations
 */

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  level: number;
  xp: number;
  high_score: number;
  total_games: number;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export interface GameRecord {
  id: string;
  user_id: string;
  mode: string;
  score: number;
  words_found: number;
  duration_seconds?: number;
  difficulty?: string;
  accuracy?: number;
  created_at: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string;
  high_score: number;
  level: number;
  total_games: number;
  rank: number;
}

/**
 * Create a new user profile after signup
 */
export async function createUserProfile(userId: string, email: string, username: string) {
  const { data, error } = await supabase.from("profiles").insert([
    {
      id: userId,
      email,
      username,
      level: 1,
      xp: 0,
      high_score: 0,
      total_games: 0,
    },
  ]);

  if (error) {
    console.error("Error creating profile:", error);
    throw error;
  }

  return data;
}

/**
 * Get user profile by ID
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // User not found
    }
    throw error;
  }

  return data as UserProfile;
}

/**
 * Update user profile
 */
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data as UserProfile;
}

/**
 * Update user stats after game
 */
export async function updateGameStats(
  userId: string,
  score: number,
  wordsFound: number
) {
  const profile = await getUserProfile(userId);
  if (!profile) throw new Error("User profile not found");

  const newHighScore = Math.max(profile.high_score, score);
  const newTotalGames = profile.total_games + 1;

  return updateUserProfile(userId, {
    high_score: newHighScore,
    total_games: newTotalGames,
    xp: profile.xp + score,
  });
}

/**
 * Save a game to history
 */
export async function saveGameToHistory(
  userId: string,
  gameData: Omit<GameRecord, "id" | "user_id" | "created_at">
) {
  const { data, error } = await supabase.from("game_history").insert([
    {
      user_id: userId,
      ...gameData,
      created_at: new Date().toISOString(),
    },
  ]);

  if (error) throw error;
  return data;
}

/**
 * Get user's game history
 */
export async function getUserGameHistory(userId: string, limit: number = 50): Promise<GameRecord[]> {
  const { data, error } = await supabase
    .from("game_history")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []) as GameRecord[];
}

/**
 * Get user statistics
 */
export async function getUserStatistics(userId: string) {
  const { data, error } = await supabase
    .from("game_history")
    .select("score, words_found, accuracy, duration_seconds")
    .eq("user_id", userId);

  if (error) throw error;

  const games = data || [];
  if (games.length === 0) {
    return {
      totalGames: 0,
      averageScore: 0,
      averageAccuracy: 0,
      averageDuration: 0,
      bestScore: 0,
    };
  }

  const totalScore = games.reduce((sum, g) => sum + (g.score || 0), 0);
  const totalAccuracy = games.reduce((sum, g) => sum + (g.accuracy || 0), 0);
  const totalDuration = games.reduce((sum, g) => sum + (g.duration_seconds || 0), 0);

  return {
    totalGames: games.length,
    averageScore: Math.round(totalScore / games.length),
    averageAccuracy: (totalAccuracy / games.length).toFixed(2),
    averageDuration: Math.round(totalDuration / games.length),
    bestScore: Math.max(...games.map((g) => g.score || 0)),
  };
}

/**
 * Get leaderboard
 */
export async function getLeaderboard(limit: number = 100): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, high_score, level, total_games")
    .order("high_score", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return (data || []).map((entry, index) => ({
    ...entry,
    rank: index + 1,
  })) as LeaderboardEntry[];
}

/**
 * Check if username is available
 */
export async function checkUsernameAvailable(username: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (error && error.code === "PGRST116") {
    return true; // Username is available
  }

  return false; // Username is taken
}

/**
 * Search users by username
 */
export async function searchUsers(query: string, limit: number = 10) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, username, level, high_score")
    .ilike("username", `%${query}%`)
    .limit(limit);

  if (error) throw error;
  return data;
}

/**
 * Get user's rank
 */
export async function getUserRank(userId: string): Promise<number> {
  const profile = await getUserProfile(userId);
  if (!profile) throw new Error("User not found");

  const { data, error } = await supabase
    .from("profiles")
    .select("high_score")
    .gt("high_score", profile.high_score);

  if (error) throw error;
  return (data?.length || 0) + 1;
}
