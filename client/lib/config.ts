/**
 * Configuration and environment variable validation
 * Ensures all required env vars are present and valid
 */

interface EnvironmentConfig {
  supabaseUrl: string | null;
  supabaseAnonKey: string | null;
  isDevelopment: boolean;
  isProduction: boolean;
}

let configCache: EnvironmentConfig | null = null;

export function getConfig(): EnvironmentConfig {
  if (configCache) {
    return configCache;
  }

  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || null;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || null;
  const isDevelopment = import.meta.env.DEV;
  const isProduction = import.meta.env.PROD;

  configCache = {
    supabaseUrl,
    supabaseAnonKey,
    isDevelopment,
    isProduction,
  };

  return configCache;
}

export function validateConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (typeof import.meta.env.VITE_SUPABASE_URL !== "string") {
    errors.push("VITE_SUPABASE_URL environment variable is missing or invalid");
  }

  if (typeof import.meta.env.VITE_SUPABASE_ANON_KEY !== "string") {
    errors.push("VITE_SUPABASE_ANON_KEY environment variable is missing or invalid");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function logConfigStatus(): void {
  const config = getConfig();
  const validation = validateConfig();

  console.log("📋 Configuration Status:");
  console.log(`   Supabase URL: ${config.supabaseUrl ? "✅ Set" : "❌ Missing"}`);
  console.log(`   Supabase Key: ${config.supabaseAnonKey ? "✅ Set" : "❌ Missing"}`);
  console.log(`   Environment: ${config.isDevelopment ? "Development" : "Production"}`);

  if (!validation.valid) {
    console.error("❌ Configuration Errors:");
    validation.errors.forEach((error) => {
      console.error(`   - ${error}`);
    });
  } else {
    console.log("✅ All configuration checks passed");
  }
}

export function isSupabaseConfigured(): boolean {
  const config = getConfig();
  return !!(config.supabaseUrl && config.supabaseAnonKey);
}

export function getSupabaseUrl(): string | null {
  return getConfig().supabaseUrl;
}

export function getSupabaseAnonKey(): string | null {
  return getConfig().supabaseAnonKey;
}
