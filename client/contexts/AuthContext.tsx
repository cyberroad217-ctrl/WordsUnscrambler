import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkUser = async () => {
      try {
        if (!supabase) {
          console.warn("⚠️ Supabase not initialized. User check skipped.");
          setLoading(false);
          return;
        }
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          console.error("❌ Error checking user:", error.message);
        }
        setUser(user || null);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error checking user";
        console.error("❌ Exception checking user:", message);
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Subscribe to auth changes
    try {
      if (supabase) {
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
          setError(null); // Clear error on successful auth state change
        });

        return () => subscription?.unsubscribe();
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error setting up auth listener";
      console.error("❌ Exception setting up auth listener:", message);
    }
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;
      console.log("✅ Sign up successful");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      console.error("❌ Sign up error:", message);
      setError(message);
      throw err;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }
      if (!email || !password) {
        throw new Error("Email and password are required");
      }
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) throw signInError;
      setUser(data.user);
      console.log("✅ Sign in successful");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign in failed";
      console.error("❌ Sign in error:", message);
      setError(message);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
      setUser(null);
      console.log("✅ Sign out successful");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Sign out failed";
      console.error("❌ Sign out error:", message);
      setError(message);
      throw err;
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setError(null);
      if (!supabase) {
        throw new Error("Supabase client not initialized");
      }
      if (!email) {
        throw new Error("Email is required");
      }
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email);
      if (resetError) throw resetError;
      console.log("✅ Password reset email sent");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Password reset failed";
      console.error("❌ Password reset error:", message);
      setError(message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
