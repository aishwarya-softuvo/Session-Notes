# Supabase Setup Guide

This guide will help you set up the Supabase backend for the Therapy Session Quick Notes application.

## Prerequisites

- A Supabase account (create one at [supabase.com](https://supabase.com))
- Supabase CLI installed (optional, for local development)

## 1. Create a New Supabase Project

1. Log in to your Supabase dashboard
2. Click "New Project"
3. Fill in your project details
4. Wait for the project to be provisioned

## 2. Create Database Table

Navigate to the SQL Editor in your Supabase dashboard and run the following SQL:

```sql
-- Create the session_notes table
CREATE TABLE session_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  session_date DATE NOT NULL,
  notes TEXT NOT NULL,
  duration INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on session_date for better query performance
CREATE INDEX idx_session_notes_session_date ON session_notes(session_date DESC);

-- Create an index on created_at for better query performance
CREATE INDEX idx_session_notes_created_at ON session_notes(created_at DESC);

-- Optional: Add a check constraint to ensure duration is positive
ALTER TABLE session_notes
ADD CONSTRAINT check_duration_positive CHECK (duration > 0);

-- Optional: Add a check constraint to ensure notes are not empty
ALTER TABLE session_notes
ADD CONSTRAINT check_notes_not_empty CHECK (length(trim(notes)) > 0);

-- Optional: Add a check constraint to ensure client_name is not empty
ALTER TABLE session_notes
ADD CONSTRAINT check_client_name_not_empty CHECK (length(trim(client_name)) > 0);
```

## 3. Disable Row Level Security (RLS)

For this demo application, RLS can be disabled. In production, you should enable and configure proper RLS policies.

In the SQL Editor, run:

```sql
ALTER TABLE session_notes DISABLE ROW LEVEL SECURITY;
```

**Note:** For a production application, you should enable RLS and create appropriate policies:

```sql
-- Enable RLS
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;

-- Example policy: Allow authenticated users to read all notes
CREATE POLICY "Allow authenticated users to read notes"
ON session_notes
FOR SELECT
TO authenticated
USING (true);

-- Example policy: Allow authenticated users to insert notes
CREATE POLICY "Allow authenticated users to insert notes"
ON session_notes
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Example policy: Allow authenticated users to delete notes
CREATE POLICY "Allow authenticated users to delete notes"
ON session_notes
FOR DELETE
TO authenticated
USING (true);
```

## 4. Create the Edge Function

### Using Supabase Dashboard

1. Navigate to "Edge Functions" in your Supabase dashboard
2. Click "New Function"
3. Name it: `validate-session-note`
4. Copy the following code:

```typescript
// supabase/functions/validate-session-note/index.ts
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
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { client_name, session_date, notes, duration }: SessionNoteInput =
      await req.json();

    // Validate duration is between 15-120 minutes
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

    // Additional validations
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

    // Validation passed
    const response: ValidationResponse = {
      valid: true,
    };

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

5. Deploy the function

### Using Supabase CLI (Alternative)

If you prefer using the CLI:

```bash
# Login to Supabase
supabase login

# Initialize Supabase in your project
supabase init

# Create the edge function
supabase functions new validate-session-note

# Copy the code above to supabase/functions/validate-session-note/index.ts

# Deploy the function
supabase functions deploy validate-session-note --project-ref YOUR_PROJECT_REF
```

## 5. Get Your Environment Variables

1. Go to Project Settings > API
2. Copy your Project URL and anon/public key
3. Create a `.env` file in your project root:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 6. Test Your Setup

You can test the edge function using curl:

```bash
curl -X POST 'https://your-project-id.supabase.co/functions/v1/validate-session-note' \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "John Doe",
    "session_date": "2024-01-15",
    "notes": "Test session notes",
    "duration": 60
  }'
```

Expected response for valid input:
```json
{
  "valid": true
}
```

Expected response for invalid input (e.g., duration = 10):
```json
{
  "valid": false,
  "error": "Session duration must be between 15 and 120 minutes"
}
```

## 7. Insert Sample Data (Optional)

To test the application, you can insert some sample data:

```sql
INSERT INTO session_notes (client_name, session_date, notes, duration)
VALUES
  ('Alice Johnson', '2024-01-15', 'Initial consultation. Client expressed concerns about work-life balance. Discussed coping strategies and scheduled follow-up.', 60),
  ('Bob Smith', '2024-01-16', 'Follow-up session. Client reported improvement in sleep patterns. Continued cognitive behavioral therapy exercises.', 45),
  ('Carol Davis', '2024-01-17', 'Family therapy session. Addressed communication issues between parents and teenager. Assigned homework for active listening.', 90);
```

## Troubleshooting

### Edge Function Not Working

- Ensure CORS headers are properly set
- Check the function logs in Supabase dashboard
- Verify your anon key is correct

### Database Connection Issues

- Verify your Supabase URL and anon key in `.env`
- Check if RLS policies are blocking access (if enabled)
- Ensure the table was created successfully

### TypeScript Errors

- Run `npm install` to ensure all dependencies are installed
- Check that your `tsconfig.json` is properly configured

## Security Considerations for Production

1. **Enable RLS**: Create proper Row Level Security policies
2. **Authentication**: Implement user authentication
3. **Input Sanitization**: Add additional server-side validation
4. **Rate Limiting**: Implement rate limiting on Edge Functions
5. **Environment Variables**: Use Supabase secrets for sensitive data
6. **HTTPS Only**: Ensure all connections use HTTPS

## Next Steps

Once your Supabase backend is set up:

1. Update your `.env` file with the correct credentials
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Navigate to `http://localhost:3000` to use the application

