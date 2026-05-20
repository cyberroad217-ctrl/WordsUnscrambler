# Supabase Integration Guide

This document outlines the Supabase integration for the WordZap Unscrambler Pro application.

## Overview

The application now uses Supabase for:
- **Authentication**: User signup, login, password reset
- **Database**: User profiles, game history, leaderboard data
- **Real-time Updates**: Live game scores and leaderboard updates

## Environment Setup

### 1. Credentials Configured
The following environment variables have been set:
```
VITE_SUPABASE_URL=https://cwjocwrvjgsmlzilbret.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

These are used by the Supabase client (`client/lib/supabase.ts`) to connect to your project.

## Database Schema

You need to create the following tables in your Supabase project:

### 1. **profiles** table
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  high_score INTEGER DEFAULT 0,
  total_games INTEGER DEFAULT 0,
  avatar_url TEXT,
  bio TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);
```

### 2. **game_history** table
```sql
CREATE TABLE game_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mode VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL,
  words_found INTEGER NOT NULL,
  duration_seconds INTEGER,
  difficulty VARCHAR(20),
  accuracy DECIMAL(5, 2),
  created_at TIMESTAMP DEFAULT now()
);
```

### 3. **leaderboard** table (optional, can be a view)
```sql
CREATE VIEW leaderboard AS
SELECT 
  p.id,
  p.username,
  p.high_score,
  p.level,
  p.total_games,
  COUNT(gh.id) as games_played,
  ROW_NUMBER() OVER (ORDER BY p.high_score DESC) as rank
FROM profiles p
LEFT JOIN game_history gh ON p.id = gh.user_id
GROUP BY p.id, p.username, p.high_score, p.level, p.total_games
ORDER BY p.high_score DESC;
```

## Authentication Flow

### Signup
- User fills out signup form with username, email, password
- `signUp()` function creates Supabase auth user
- User is redirected to login page
- User needs to verify email (if email verification is enabled)

### Login
- User enters email and password
- `signIn()` function authenticates with Supabase
- Session token is stored automatically by Supabase client
- User is redirected to dashboard

### Protected Routes
All routes except `/login` and `/signup` require authentication via the `ProtectedRoute` component in `client/App.tsx`.

### Logout
- User clicks logout button in sidebar footer
- `signOut()` function clears the session
- User is redirected to login page

## File Structure

### New Files Created:
- `client/lib/supabase.ts` - Supabase client initialization and helper functions
- `client/contexts/AuthContext.tsx` - React context for authentication state
- `client/pages/Login.tsx` - Login page
- `client/pages/Signup.tsx` - Signup page

### Modified Files:
- `client/App.tsx` - Added AuthProvider, protected routes, AppRoutes component
- `client/components/Layout.tsx` - Added useAuth hook, logout functionality
- `package.json` - Added @supabase/supabase-js dependency

## API Functions Available

### Authentication (`client/lib/supabase.ts`)
```typescript
signUp(email, password)           // Create new account
signIn(email, password)           // Login to existing account
signOut()                         // Logout current user
getCurrentUser()                  // Get current authenticated user
resetPassword(email)              // Send password reset email
```

### User Profile (`client/lib/supabase.ts`)
```typescript
getUserProfile(userId)            // Get user profile data
updateUserProfile(userId, updates) // Update profile information
```

### Game Data (`client/lib/supabase.ts`)
```typescript
saveGameHistory(userId, gameData) // Save game result
getGameHistory(userId)            // Get user's game history
getLeaderboard(limit)             // Get top players
getStatistics(userId)             // Get user statistics
```

## Using Auth in Components

### Example: Check if user is logged in
```typescript
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return <div>Welcome, {user.email}!</div>;
}
```

### Example: Logout
```typescript
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

## Security Considerations

1. **Row Level Security (RLS)**: Enable RLS on all tables to ensure users can only access their own data
2. **API Keys**: Keep your ANON key safe but remember it's meant for client-side use
3. **Email Verification**: Enable email verification in Supabase Auth settings
4. **Password Requirements**: Configure strong password policies in Auth settings
5. **Rate Limiting**: Enable rate limiting in Auth settings to prevent brute force attacks

## Testing

### Manual Testing Checklist
- [ ] Signup with new email
- [ ] Login with correct credentials
- [ ] Attempt login with wrong password (should fail)
- [ ] Logout successfully
- [ ] Protected routes redirect to login when not authenticated
- [ ] Can access all pages after logging in
- [ ] Game history is saved to database
- [ ] Leaderboard shows correct rankings

## Troubleshooting

### "Missing Supabase configuration" error
- Ensure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in your environment
- Check Project Settings > API in Supabase dashboard
- Restart dev server after changing env vars

### Users can't login
- Verify user exists in Supabase Auth dashboard
- Check email/password are correct
- Ensure Auth is enabled in Supabase project settings
- Check browser console for detailed error messages

### Database operations failing
- Verify tables exist with correct schema
- Check Row Level Security (RLS) policies are configured
- Ensure user ID is passed correctly to database queries
- Verify service role key permissions if needed

## Next Steps

1. Create database tables using the SQL provided above
2. Set up Row Level Security (RLS) policies
3. Configure email templates in Auth settings (optional)
4. Test authentication flow
5. Integrate game history saving when games are played
6. Display user stats from database on dashboard/profile pages
7. Build leaderboard from database data

## Support

For more information:
- Supabase Docs: https://supabase.com/docs
- Authentication: https://supabase.com/docs/guides/auth
- Database: https://supabase.com/docs/guides/database
- Realtime: https://supabase.com/docs/guides/realtime
