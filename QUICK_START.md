# Quick Start Guide - WordZap Unscrambler Pro

## 5-Minute Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Set Environment Variables
Create `.env.local` in project root:
```
VITE_SUPABASE_URL=https://cwjocwrvjgsmlzilbret.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
```
http://localhost:8080/login
```

## Testing Authentication

### Sign Up
1. Go to `/signup`
2. Enter username, email, password
3. Click "Create Account"
4. Redirects to login after success

### Sign In
1. Go to `/login`
2. Enter email and password
3. Click "Sign In"
4. Redirects to dashboard after success

### Protected Routes
- All routes except `/login` and `/signup` require authentication
- Unauthenticated users redirect to `/login` automatically

## File Quick Reference

| File | Purpose |
|------|---------|
| `client/lib/supabase.ts` | Supabase client & API helpers |
| `client/contexts/AuthContext.tsx` | Global auth state |
| `client/components/ErrorBoundary.tsx` | Error catching |
| `client/pages/Login.tsx` | Login form |
| `client/pages/Signup.tsx` | Signup form |
| `client/lib/userService.ts` | Database helpers |
| `.env.local` | Local env vars |

## Common Tasks

### Add Protected Page
```typescript
import { useAuth } from "@/contexts/AuthContext";

export default function MyPage() {
  const { user } = useAuth();
  
  if (!user) return <div>Login required</div>;
  
  return <div>Hello, {user.email}!</div>;
}

// Add route in client/App.tsx:
<Route
  path="/mypage"
  element={
    <ProtectedRoute>
      <Layout><MyPage /></Layout>
    </ProtectedRoute>
  }
/>
```

### Save User Data
```typescript
import { updateUserProfile } from "@/lib/userService";
import { useAuth } from "@/contexts/AuthContext";

function UserProfile() {
  const { user } = useAuth();
  
  const handleUpdate = async () => {
    const { data, error } = await updateUserProfile(user.id, {
      username: "newname"
    });
    if (error) console.error("Update failed:", error);
  };
  
  return <button onClick={handleUpdate}>Update</button>;
}
```

### Save Game Result
```typescript
import { saveGameToHistory } from "@/lib/userService";
import { useAuth } from "@/contexts/AuthContext";

function GameEnd() {
  const { user } = useAuth();
  
  const handleGameEnd = async (score: number) => {
    const { error } = await saveGameToHistory(user.id, {
      mode: "classic",
      score: score,
      words_found: 5,
      difficulty: "medium"
    });
    if (error) console.error("Save failed:", error);
  };
  
  return <button onClick={() => handleGameEnd(100)}>End Game</button>;
}
```

### Get Leaderboard
```typescript
import { getLeaderboard } from "@/lib/userService";
import { useEffect, useState } from "react";

function Leaderboard() {
  const [rankings, setRankings] = useState([]);
  
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await getLeaderboard(100);
      if (!error) setRankings(data);
    };
    fetch();
  }, []);
  
  return (
    <div>
      {rankings.map((player) => (
        <div key={player.id}>{player.username}: {player.high_score}</div>
      ))}
    </div>
  );
}
```

## Debugging

### Check Console (F12)
```
✅ Configuration Status:
   Supabase URL: ✅ Set
   Supabase Key: ✅ Set

✅ Supabase client initialized successfully

🔐 Attempting login...
✅ Login successful
```

### Check Environment Variables
```bash
# Print env vars
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY

# Or create simple test:
// client/TestEnv.tsx
export default function TestEnv() {
  return (
    <div>
      <p>URL: {import.meta.env.VITE_SUPABASE_URL}</p>
      <p>Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</p>
    </div>
  );
}
```

### Check Supabase Connection
```typescript
import { supabase } from "@/lib/supabase";

if (supabase) {
  console.log("✅ Supabase client exists");
} else {
  console.error("❌ Supabase not initialized");
}
```

## Build for Production

### Local Build Test
```bash
npm run build:client
ls -la dist/spa/
# Should show: index.html, assets/ directory
```

### Deploy to Netlify
```bash
# Push to GitHub
git add .
git commit -m "production: deploy"
git push origin main

# Or use CLI
npm i -g netlify-cli
netlify login
netlify deploy --prod --dir=dist/spa
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot read property of undefined" | Check if supabase is null in console |
| "VITE_SUPABASE_URL is missing" | Add .env.local and restart server |
| Login form won't submit | Check browser console for validation errors |
| Blank page after login | Check if routes are properly protected |
| 404 on page refresh | Verify netlify.toml SPA redirect rule |

## Environment Variables Explanation

```
VITE_SUPABASE_URL
├─ Where Supabase is hosted
├─ Format: https://[project-id].supabase.co
├─ Public (safe to expose)
└─ Required for: auth, database, storage

VITE_SUPABASE_ANON_KEY
├─ Public authentication key
├─ Allows client-side requests
├─ Cannot access sensitive data
├─ Public (safe to expose)
└─ Required for: all API calls
```

## Project Structure
```
WordZap Unscrambler Pro
├── client/
│   ├── components/     ← Reusable UI components
│   ├── contexts/       ← State management (Auth)
│   ├── lib/            ← Utilities (Supabase, userService)
│   ├── pages/          ← Full pages (Login, Dashboard, etc)
│   └── App.tsx         ← Root component
├── netlify.toml        ← Deployment config
├── vite.config.ts      ← Build config
└── index.html          ← HTML entry point
```

## Key Concepts

### Protected Route
```typescript
// Only logged-in users can access
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Auth Context
```typescript
// Access anywhere with useAuth()
const { user, loading, error } = useAuth();
```

### Error Boundary
```typescript
// Catches all JavaScript errors
// Prevents blank page crashes
// Already wrapped in App.tsx
```

### Safe API Calls
```typescript
try {
  const { data, error } = await someFunction();
  if (error) throw error;
  return data;
} catch (err) {
  console.error("Failed:", err);
  return fallbackValue; // Never crashes
}
```

## Performance Tips

1. **Use loading states** while fetching data
2. **Cache data** when possible (e.g., user profile)
3. **Lazy load** large pages
4. **Optimize images** before upload
5. **Monitor console** for warnings

## Security Tips

1. **Never commit `.env` files**
2. **Use ANON key** (not SERVICE_ROLE)
3. **Trust Supabase RLS** to protect data
4. **Validate** all user input
5. **Log out** properly on sensitive operations

## More Information

- **Full Integration Guide**: See `SUPABASE_FRONTEND_INTEGRATION.md`
- **Database Setup**: See `SUPABASE_SETUP.md`
- **Deployment Guide**: See `NETLIFY_DEPLOYMENT.md`
- **Production Checklist**: See `PRODUCTION_DEPLOYMENT_CHECKLIST.md`

---

**Happy coding! 🚀**

Questions? Check the console logs for helpful messages with ✅ ❌ ⚠️ 🔐 prefixes.
