# 🚀 Supabase Migration Guide

This guide will help you complete the migration from MongoDB to Supabase for your Portfolio 2.0 project.

## 📋 Prerequisites

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Sign up/Log in
   - Create a new project
   - Wait for the project to be provisioned

## 🔧 Step 1: Get Your Supabase Credentials

1. **In your Supabase Dashboard:**
   - Go to Settings → API
   - Copy these values:
     - **Project URL** (e.g., https://your-project.supabase.co)
     - **anon public key** (starts with eyJ...)
     - **service_role key** (starts with eyJ... - keep this secret!)

## 🗄️ Step 2: Set up the Database Schema

1. **In your Supabase Dashboard:**
   - Go to SQL Editor
   - Create a new query
   - Copy and paste the contents of `server/migrations/001_create_tables.sql`
   - Click "Run" to execute the SQL

This will create:
- `projects` table
- `skills` table  
- `users` table
- All necessary indexes and triggers
- Row Level Security policies

## 🔑 Step 3: Update Environment Variables

Update your `server/.env` file with your actual Supabase credentials:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# Server Configuration
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-for-dev
```

## 👤 Step 4: Create an Admin User

1. **Start your server:**
   ```bash
   cd server
   npm start
   ```

2. **Create your first admin user:**
   ```bash
   curl -X POST http://localhost:5000/api/auth/create-admin \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "email": "your-email@example.com",
       "password": "your-secure-password"
     }'
   ```

   Or use a tool like Postman/Insomnia to make this POST request.

## 🧪 Step 5: Test the Migration

1. **Test the API endpoints:**

   ```bash
   # Get all projects (should return empty array initially)
   curl http://localhost:5000/api/projects
   
   # Get all skills (should return empty array initially)
   curl http://localhost:5000/api/skills
   
   # Test login
   curl -X POST http://localhost:5000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "username": "admin",
       "password": "your-secure-password"
     }'
   ```

2. **Start your frontend:**
   ```bash
   cd client
   npm run dev
   ```

3. **Test the full application:**
   - Go to http://localhost:3000/login
   - Log in with your admin credentials
   - Try adding a new project
   - Try adding a new skill

## 🎯 Step 6: Verify Everything Works

✅ **Checklist:**
- [ ] Server starts without MongoDB connection errors
- [ ] Supabase connection shows "✅ Supabase connected successfully"
- [ ] Can log in to admin dashboard
- [ ] Can add new projects
- [ ] Can add new skills
- [ ] Can edit projects and skills
- [ ] Can delete projects and skills
- [ ] Projects and skills display on the homepage

## 🔄 Migration Benefits

**What you gained:**
- ✅ **No more DNS/connectivity issues**
- ✅ **Built-in Row Level Security**
- ✅ **Real-time capabilities** (for future features)
- ✅ **Better performance** with CDN
- ✅ **Free tier with generous limits**
- ✅ **Built-in authentication options**
- ✅ **Automatic backups**

## 🐛 Troubleshooting

**Common Issues:**

1. **Supabase connection error:**
   - Check your environment variables
   - Ensure your Supabase project is active
   - Verify the URL format

2. **RLS (Row Level Security) issues:**
   - Make sure the SQL schema was executed correctly
   - Check that policies are created

3. **Authentication issues:**
   - Ensure you created an admin user
   - Check JWT_SECRET in your environment

4. **CORS issues:**
   - Add your frontend URL to Supabase → Authentication → URL Configuration

## 📊 Data Migration (If you had existing data)

If you had existing data in MongoDB, you would need to:
1. Export data from MongoDB
2. Transform the data format (MongoDB ObjectId → UUID)
3. Import into Supabase tables

For now, you can start fresh with the new Supabase setup!

## 🎉 Next Steps

Once migration is complete, you can:
- Deploy to Vercel/Netlify (frontend) 
- Your backend will work with the same hosting since it's just Express + Supabase
- Consider using Supabase Auth for enhanced authentication features
- Add real-time features using Supabase subscriptions
