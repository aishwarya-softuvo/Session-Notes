# Quick Start Guide

Get the Therapy Session Quick Notes app running in under 10 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase

### Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click **"New Project"**
3. Fill in:
   - Name: `therapy-notes`
   - Database Password: (generate or create one)
   - Region: Choose closest to you
4. Click **"Create new project"** and wait 1-2 minutes

### Create the Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **"New query"**
3. Paste this SQL and click **"Run"**:

```sql
CREATE TABLE session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  session_date DATE NOT NULL,
  notes TEXT NOT NULL,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_session_notes_session_date ON session_notes(session_date DESC);

ALTER TABLE session_notes DISABLE ROW LEVEL SECURITY;
```

### Create the Edge Function

1. Go to **Edge Functions** in the sidebar
2. Click **"New Function"** or **"Create Function"**
3. Name it: `validate-session-note`
4. Replace the default code with:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

interface SessionNoteInput {
  client_name: string;
  session_date: string;
  notes: string;
  duration: number;
}

interface ValidationResponse {
  valid: boolean;
  error?: string;
}

serve(async (req) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { client_name, session_date, notes, duration }: SessionNoteInput = await req.json();

    if (duration < 15 || duration > 120) {
      const response: ValidationResponse = {
        valid: false,
        error: 'Session duration must be between 15 and 120 minutes',
      };
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    if (!client_name || client_name.trim().length === 0) {
      const response: ValidationResponse = {
        valid: false,
        error: 'Client name is required',
      };
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    if (!session_date) {
      const response: ValidationResponse = {
        valid: false,
        error: 'Session date is required',
      };
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    if (!notes || notes.trim().length === 0) {
      const response: ValidationResponse = {
        valid: false,
        error: 'Notes are required',
      };
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    if (notes.length > 500) {
      const response: ValidationResponse = {
        valid: false,
        error: 'Notes must not exceed 500 characters',
      };
      return new Response(JSON.stringify(response), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const response: ValidationResponse = { valid: true };
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    const response: ValidationResponse = {
      valid: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
```

5. Click **"Deploy"**

### Get Your API Credentials

1. Go to **Project Settings** (gear icon in sidebar)
2. Click **"API"** in the left menu
3. Copy:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 3: Configure Environment Variables

1. In your project root, create a file named `.env`:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

2. Replace the values with your actual Supabase URL and anon key

## Step 4: Run the Application

```bash
npm run dev
```

Open your browser to **http://localhost:3000**

## Step 5: Test the App

1. Click **"Add Note"**
2. Fill in the form:
   - Client Name: `John Doe`
   - Session Date: `Today's date`
   - Notes: `Initial consultation session`
   - Duration: `60` minutes
3. Click **"Save Note"**
4. You should see your note appear on the home page!

## Troubleshooting

### "Missing Supabase environment variables"

- Make sure your `.env` file is in the project root (same level as `package.json`)
- Check that the file is named exactly `.env` (not `.env.txt`)
- Verify the variable names start with `VITE_`

### "Failed to fetch notes"

- Verify your Supabase URL and anon key are correct
- Check that the `session_notes` table was created
- Make sure RLS is disabled: `ALTER TABLE session_notes DISABLE ROW LEVEL SECURITY;`

### "Validation service unavailable"

- Ensure the Edge Function is deployed
- Check the function name is exactly `validate-session-note`
- Verify the function is running in the Supabase dashboard

### "Duration must be between 15 and 120 minutes"

This is working correctly! The Edge Function is validating your input. Enter a duration between 15-120 minutes.

## Optional: Add Sample Data

Want some data to test with? Run this in the SQL Editor:

```sql
INSERT INTO session_notes (client_name, session_date, notes, duration)
VALUES
  ('Alice Johnson', CURRENT_DATE - INTERVAL '2 days', 'Initial consultation. Client expressed concerns about work-life balance. Discussed coping strategies.', 60),
  ('Bob Smith', CURRENT_DATE - INTERVAL '1 day', 'Follow-up session. Client reported improvement in sleep patterns. Continued CBT exercises.', 45),
  ('Carol Davis', CURRENT_DATE, 'Family therapy session. Addressed communication issues. Assigned homework for active listening.', 90);
```

## Next Steps

- Read the full [README.md](./README.md) for detailed information
- Check [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for production deployment
- Start customizing the app for your needs!

## Need Help?

- Check the console in your browser DevTools for error messages
- Review the Supabase dashboard logs for Edge Function errors
- Ensure all dependencies are installed: `npm install`

---

**Congratulations! You're ready to use the app! 🎉**

