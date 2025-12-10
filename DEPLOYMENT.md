# Deployment Guide: Supabase + Vercel

This guide will walk you through deploying neighbr to production using Supabase (database) and Vercel (hosting).

## Part 1: Set Up Supabase Database

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in/sign up
2. Click "New Project"
3. Fill in:
   - **Name**: neighbr
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait ~2 minutes for setup

### Step 2: Run the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy and paste the entire contents of `schema.sql` from your project
4. Click "Run" or press `Cmd/Ctrl + Enter`
5. You should see "Success. No rows returned" - this is normal!

### Step 3: Verify the Data

1. Go to **Table Editor** in the left sidebar
2. You should see the `properties` table
3. Click on it to see the 5 sample properties

### Step 4: Get Your Connection String

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **Database** in the left menu
3. Scroll down to **Connection string**
4. Select **URI** mode
5. Copy the connection string - it looks like:
   ```
   postgresql://postgres.xxxxxxxxxxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:5432/postgres
   ```
6. Replace `[YOUR-PASSWORD]` with your actual database password from Step 1
7. **Save this connection string** - you'll need it for Vercel!

## Part 2: Set Up Google Maps API

### Step 1: Create/Select a GCP Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Name it something like "neighbr"

### Step 2: Enable Required APIs

1. Go to **APIs & Services** > **Library**
2. Search for and enable:
   - **Maps JavaScript API**
   - **Places API**

### Step 3: Create API Key

1. Go to **APIs & Services** > **Credentials**
2. Click **Create Credentials** > **API Key**
3. Copy your API key immediately
4. Click **Edit API key** (recommended security steps):
   - Under "API restrictions", select "Restrict key"
   - Check only: Maps JavaScript API and Places API
   - Under "Website restrictions":
     - Add `http://localhost:3000/*` (for local development)
     - Add `https://*.vercel.app/*` (for Vercel preview deployments)
     - Later, add your custom domain if you have one
5. Click **Save**

## Part 3: Deploy to Vercel

### Step 1: Push to GitHub

If you haven't already pushed your latest changes:

```bash
git add .
git commit -m "Initial commit with Supabase setup"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New** > **Project**
3. Find and select your `neighbr` repository
4. Click **Import**

### Step 3: Configure Environment Variables

Before deploying, add your environment variables:

1. In the "Configure Project" screen, expand **Environment Variables**
2. Add these two variables:

   **Variable 1:**
   - Name: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Value: Your Google Maps API key from Part 2

   **Variable 2:**
   - Name: `DATABASE_URL`
   - Value: Your Supabase connection string from Part 1, Step 4

3. Make sure they're available for all environments (Production, Preview, Development)

### Step 4: Deploy!

1. Click **Deploy**
2. Wait 2-3 minutes for the build to complete
3. Once done, click **Visit** to see your live site!

## Part 4: Test Your Deployment

1. Visit your Vercel URL (e.g., `neighbr.vercel.app`)
2. Try searching for an address:
   - Start typing "123 Main"
   - You should see Google autocomplete suggestions
   - Select an address and click Search
3. You should see results from your database!

## Common Issues & Solutions

### Issue: "Error loading Google Maps"
- **Solution**: Check that your Google Maps API key is correct in Vercel environment variables
- Make sure both Maps JavaScript API and Places API are enabled in GCP
- Verify your Vercel domain is allowed in API key restrictions

### Issue: "Failed to fetch properties"
- **Solution**: Check your DATABASE_URL in Vercel environment variables
- Make sure you replaced `[YOUR-PASSWORD]` with your actual password
- Verify the schema was run successfully in Supabase SQL Editor

### Issue: No properties showing up
- **Solution**: Go to Supabase Table Editor and verify the sample data exists
- Check the Network tab in browser DevTools for API errors

## Next Steps After Deployment

### Add a Custom Domain (Optional)

1. In Vercel project settings > **Domains**
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. Update your Google Maps API key restrictions to include your custom domain

### Set Up Production Database Pool

For better performance with many users:

1. In Supabase, go to **Project Settings** > **Database**
2. Under **Connection Pooling**, use the "Transaction" mode connection string
3. Update your `DATABASE_URL` in Vercel to use the pooler URL

### Monitor Your App

- **Vercel Analytics**: Enable in project settings for visitor analytics
- **Supabase Logs**: Monitor database queries and errors
- **Google Maps Quota**: Check API usage in GCP console

### Prepare for Scraping Data

When you're ready to add real data:

1. Use the POST API endpoint at `https://your-domain.vercel.app/api/properties`
2. Or add data directly via Supabase SQL Editor
3. Clear the sample data first:
   ```sql
   DELETE FROM properties WHERE id IN (1, 2, 3, 4, 5);
   ```

## Environment Variables Summary

Keep these safe and never commit them to Git:

```env
# .env.local (for local development)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
DATABASE_URL=your_supabase_connection_string
```

Add the same variables to:
- Vercel project settings (for production)
- Any team members' local `.env.local` files

## Support

- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)

---

**Congratulations!** Your neighbr app is now live! 🎉
