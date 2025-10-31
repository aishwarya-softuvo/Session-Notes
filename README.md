# Therapy Session Quick Notes

A modern, user-friendly note-taking application for therapists to manage quick session notes efficiently.

## 🚀 Tech Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) v5
- **Routing**: React Router DOM v6
- **Backend**: Supabase (PostgreSQL database + Edge Functions)
- **Styling**: Emotion (CSS-in-JS)

## ✨ Features

- ✅ Create session notes with client name, date, notes, and duration
- ✅ View all notes in a responsive card grid layout
- ✅ Delete notes with confirmation dialog
- ✅ Server-side validation via Supabase Edge Function
- ✅ Real-time feedback with loading states and snackbar notifications
- ✅ Fully typed with TypeScript (no `any` types)
- ✅ Clean, modern Material-UI design
- ✅ Mobile-responsive layout

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Supabase Account** (free tier works)

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd therapy-session-notes
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase Backend

Follow the detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to:

- Create the database table
- Deploy the Edge Function
- Configure environment variables

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```bash
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

You can find these values in your Supabase project settings under **API**.

## 🚀 Running the Application

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── NoteCard.tsx           # Card component for displaying individual notes
│   ├── NoteForm.tsx           # Form component for creating new notes
│   └── DeleteDialog.tsx       # Confirmation dialog for deleting notes
├── hooks/
│   └── useSessionNotes.ts     # Custom hook for CRUD operations
├── pages/
│   ├── NotesList.tsx          # Home page displaying all notes
│   └── AddNote.tsx            # Page for adding a new note
├── supabase/
│   ├── client.ts              # Supabase client configuration
│   └── validateSessionNote.ts # Edge function client wrapper
├── types/
│   └── sessionNote.ts         # TypeScript type definitions
├── App.tsx                     # Main app component with routing
└── main.tsx                    # Application entry point
```

## 🎯 Key Components

### Custom Hook: `useSessionNotes`

A reusable React hook that provides:
- `notes`: Array of all session notes
- `loading`: Loading state
- `error`: Error message if any
- `fetchNotes()`: Fetch all notes
- `addNote(note)`: Add a new note
- `deleteNote(id)`: Delete a note by ID

### Edge Function: `validate-session-note`

Server-side validation that ensures:
- Duration is between 15-120 minutes
- All required fields are present
- Notes don't exceed 500 characters

## 🗄️ Database Schema

### Table: `session_notes`

| Column         | Type      | Description                    |
|----------------|-----------|--------------------------------|
| `id`           | UUID      | Primary key (auto-generated)   |
| `client_name`  | TEXT      | Client's name                  |
| `session_date` | DATE      | Date of the therapy session    |
| `notes`        | TEXT      | Session notes (max 500 chars)  |
| `duration`     | INTEGER   | Session duration in minutes    |
| `created_at`   | TIMESTAMP | Record creation timestamp      |

## 🔒 Security Notes

This demo application has Row Level Security (RLS) disabled for simplicity. For production use:

1. Enable RLS on the `session_notes` table
2. Implement user authentication with Supabase Auth
3. Create appropriate RLS policies
4. Add user-specific access controls

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for production security recommendations.

## 🧪 Testing the Application

1. Start the development server
2. Navigate to `http://localhost:3000`
3. Click "Add Note" to create a new session note
4. Fill in the form with:
   - Client name
   - Session date
   - Notes (max 500 characters)
   - Duration (must be 15-120 minutes)
5. Submit the form
6. View the note on the home page
7. Click the delete icon to remove a note

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Loading States**: Clear feedback during async operations
- **Error Handling**: User-friendly error messages
- **Confirmation Dialogs**: Prevent accidental deletions
- **Snackbar Notifications**: Success/error feedback
- **Card Hover Effects**: Smooth animations on interaction
- **Empty State**: Helpful message when no notes exist

## 📦 Dependencies

### Production Dependencies
- `react` & `react-dom`: React 19
- `@mui/material`: Material-UI components
- `@emotion/react` & `@emotion/styled`: CSS-in-JS for MUI
- `@supabase/supabase-js`: Supabase client
- `react-router-dom`: Client-side routing

### Development Dependencies
- `typescript`: TypeScript compiler
- `vite`: Build tool
- `@vitejs/plugin-react`: Vite React plugin
- `eslint`: Code linting

## 🐛 Troubleshooting

### Issue: "Missing Supabase environment variables"

**Solution**: Ensure your `.env` file exists and contains valid Supabase credentials.

### Issue: Edge Function validation fails

**Solution**: 
1. Check that the Edge Function is deployed
2. Verify your Supabase anon key is correct
3. Check the function logs in Supabase dashboard

### Issue: Database connection errors

**Solution**:
1. Verify your Supabase URL and key
2. Ensure the `session_notes` table exists
3. Check if RLS is blocking access (disable for demo)

## 📝 Code Quality

This project follows best practices:

- ✅ **Strict TypeScript**: No `any` types, full type safety
- ✅ **Functional Components**: Using React hooks
- ✅ **Custom Hooks**: Reusable logic with `useSessionNotes`
- ✅ **Proper Error Handling**: Try-catch blocks and error states
- ✅ **Clean Code**: Well-organized component structure
- ✅ **Accessibility**: ARIA labels and semantic HTML

## 🚀 Future Enhancements

Potential improvements for production:

- [ ] User authentication and authorization
- [ ] Search and filter functionality
- [ ] Edit existing notes
- [ ] Export notes to PDF/CSV
- [ ] Rich text editor for notes
- [ ] Client management system
- [ ] Appointment scheduling
- [ ] Data analytics dashboard
- [ ] Dark mode theme toggle

## 📄 License

This project is provided as-is for educational and demonstration purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created as a coding challenge demonstration project.

---

**Note**: This is a demo application. For production use, implement proper authentication, authorization, and security measures as outlined in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md).

