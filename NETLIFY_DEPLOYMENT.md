# Netlify Deployment Guide - WordZap Unscrambler Pro

## Overview
This guide walks through deploying the WordZap Unscrambler Pro application to Netlify.

## Prerequisites
- Netlify account (https://netlify.com)
- GitHub repository connected to Netlify
- Environment variables configured in Netlify

## Fixed Issues

### Issue: Blank Page on Netlify
**Root Cause:** Missing SPA fallback redirect rule for client-side routing

**Solution:** Updated `netlify.toml` with:
```toml
# Redirect all routes to index.html for client-side routing (SPA)
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

This ensures that all routes are served by the React Router on the client-side, not trying to find actual files on the server.

## Configuration Files

### `netlify.toml`
The project includes a properly configured `netlify.toml` with:
```toml
[build]
command = "npm run build:client"
functions = "netlify/functions"
publish = "dist/spa"

[[redirects]]
from = "/*"
to = "/index.html"
status = 200

[[redirects]]
from = "/api/*"
to = "/.netlify/functions/api/:splat"
status = 200
```

This configuration:
- Runs `npm run build:client` to build the React app
- Publishes from `dist/spa` directory
- Redirects all routes to `index.html` for SPA routing
- Routes `/api/*` to Netlify functions

## Environment Variables Setup

### Step 1: Add Environment Variables to Netlify
1. Go to your Netlify dashboard
2. Select your site
3. Go to **Site settings** → **Build & deploy** → **Environment**
4. Click **Edit variables**
5. Add the following variables:

```
VITE_SUPABASE_URL = https://cwjocwrvjgsmlzilbret.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
```

### Step 2: Rebuild Trigger
After adding environment variables:
1. Go to **Deploys** tab
2. Click **Trigger deploy** → **Deploy site**
3. This rebuilds with the new environment variables

## Build Process

### Local Build Test
Before deploying, test the build locally:
```bash
npm run build:client
```

This creates `dist/spa/` with:
- `index.html` - Main HTML file
- `assets/` - JavaScript, CSS bundles
- Static files and assets

### Verify Build Output
```bash
ls -la dist/spa/
# Should see:
# - index.html
# - assets/ (directory with .js and .css files)
```

## Deployment Steps

### Option 1: Git-Connected Deployment (Recommended)
1. Commit and push changes to GitHub
2. Netlify automatically detects the push
3. Triggers build using `netlify.toml` configuration
4. Deploys to your site

### Option 2: Manual Deploy via CLI
```bash
npm install -g netlify-cli
netlify login
npm run build:client
netlify deploy --prod --dir=dist/spa
```

### Option 3: Manual Deploy via Netlify UI
1. Go to Netlify dashboard
2. Click **Add new site** → **Deploy manually**
3. Drag and drop the `dist/spa` folder

## Verification Checklist

After deployment, verify:

✅ **Home Page Loads**
- Visit https://wordsunscrambler.netlify.app/
- Should see the WordZap homepage (or redirected to /login if not authenticated)

✅ **Client-Side Routing Works**
- Visit https://wordsunscrambler.netlify.app/unscrambler
- Page should load (doesn't show 404)
- Verify sidebar navigation works

✅ **Authentication Works**
- Visit https://wordsunscrambler.netlify.app/login
- Signup page accessible at /signup
- Login/Signup functionality works

✅ **Static Assets Load**
- Open DevTools (F12) → Console
- No 404 errors for CSS, JS, or images
- Check Network tab - all assets load with 200 status

✅ **Environment Variables**
- Open DevTools → Console
- No "Missing Supabase configuration" error
- Supabase functions should work

## Troubleshooting

### Problem: Blank Page / White Screen
**Solutions:**
1. Clear browser cache (Ctrl+Shift+Delete)
2. Open DevTools Console (F12) - look for errors
3. Check if netlify.toml has the SPA redirect rule
4. Verify build completed successfully in Netlify logs

### Problem: 404 on Page Refresh
**Solution:** The SPA redirect rule is missing. Update `netlify.toml`:
```toml
[[redirects]]
from = "/*"
to = "/index.html"
status = 200
```

### Problem: "Missing Supabase configuration"
**Solution:** Environment variables not set. Add to Netlify:
1. Site settings → Environment
2. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. Trigger a new deploy

### Problem: Styles/Assets Not Loading
**Causes & Solutions:**
- **Wrong base path:** Vite build output path mismatch
  - Check `vite.config.ts` has `outDir: "dist/spa"`
  - Check `netlify.toml` has `publish = "dist/spa"`
- **Cache issue:** Hard refresh browser (Ctrl+Shift+R)
- **Build failed:** Check Netlify build logs for errors

### Problem: 500 Error on API Routes
**Solution:** Netlify Functions not configured. Ensure:
1. `netlify/functions/` directory exists
2. `netlify.toml` has functions configuration:
```toml
[functions]
external_node_modules = ["express"]
node_bundler = "esbuild"
```

## Accessing Netlify Logs

### Build Logs
1. Dashboard → Select site → **Deploys** tab
2. Click on a deployment
3. View **Build log** output
4. Look for errors during `npm run build:client`

### Deploy Logs
1. Same as above
2. View **Deploy summary** for post-build issues

### Function Logs
1. Dashboard → **Functions** tab
2. Select function name
3. View real-time logs (if function is running)

## Performance Optimization

### 1. Enable Caching
Netlify automatically caches static assets. To customize:
- Create `dist/spa/_headers` file:
```
/*
  Cache-Control: public, max-age=3600
/index.html
  Cache-Control: public, max-age=0, must-revalidate
/assets/*
  Cache-Control: public, max-age=31536000, immutable
```

### 2. Enable Compression
Netlify automatically compresses assets. Verify in response headers.

### 3. Use Netlify Analytics (Optional)
1. Dashboard → Analytics
2. Provides basic site traffic insights

## Domain Configuration

### Connect Custom Domain
1. Dashboard → **Domain settings**
2. Add custom domain (e.g., wordsunscrambler.com)
3. Update DNS records or let Netlify manage
4. Enable HTTPS (auto-enabled for .netlify.app and custom domains)

### Enable HTTPS
- Automatic for all Netlify sites
- Managed via Let's Encrypt
- No additional configuration needed

## Rollback Deployment

If something goes wrong:
1. Dashboard → **Deploys** tab
2. Find the previous working deployment
3. Click the deploy
4. Click **Publish deploy**

## Continuous Deployment

### Auto-Deploy from GitHub
Already configured! Any push to your connected GitHub branch triggers:
1. Automatic build using `netlify.toml`
2. Automatic deploy to live site
3. View progress in Netlify dashboard

### Disable Auto-Deploy
1. Dashboard → **Site settings** → **Build & deploy**
2. Click **Deploy contexts**
3. Change branch settings to manual

## Security

### Protect API Keys
- Use Netlify environment variables (never commit `.env` files)
- VITE_SUPABASE_ANON_KEY is safe to expose (it's the public key)
- Service role keys should never be exposed

### Enable Branch Previews
1. Dashboard → **Site settings** → **Build & deploy** → **Deploy contexts**
2. Enable **Branch deploys**
3. Pull requests get preview URLs automatically

## Support & Resources

- Netlify Docs: https://docs.netlify.com
- Netlify CLI: https://cli.netlify.com
- Build Configuration: https://docs.netlify.com/configure-builds/overview
- Redirects & Rewrites: https://docs.netlify.com/routing/overview
- Environment Variables: https://docs.netlify.com/environment-variables/overview
- Functions: https://docs.netlify.com/functions/overview

## Next Steps

1. ✅ Verify netlify.toml is configured correctly
2. ✅ Add environment variables in Netlify dashboard
3. ✅ Trigger a new deployment
4. ✅ Test all routes work without 404 errors
5. ✅ Verify Supabase authentication works
6. ✅ Monitor build logs for any warnings

## Success!
Your WordZap Unscrambler Pro should now be live and fully functional on Netlify!
