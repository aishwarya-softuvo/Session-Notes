# Setup Checklist ✅

Use this checklist to ensure your Therapy Session Quick Notes app is properly configured.

## Prerequisites
- [ ] Node.js v18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Supabase account created at [supabase.com](https://supabase.com)

## Step 1: Project Setup
- [ ] Cloned/downloaded the project
- [ ] Opened terminal in project directory
- [ ] Ran `npm install`
- [ ] Verified no installation errors

## Step 2: Supabase Project
- [ ] Created new Supabase project
- [ ] Project is fully provisioned (green status)
- [ ] Noted down project URL
- [ ] Noted down anon/public key

## Step 3: Database Setup
- [ ] Opened SQL Editor in Supabase
- [ ] Ran the CREATE TABLE command
- [ ] Table `session_notes` appears in Table Editor
- [ ] Verified table has 6 columns: id, client_name, session_date, notes, duration, created_at
- [ ] Ran the DISABLE RLS command
- [ ] Verified indexes were created

## Step 4: Edge Function
- [ ] Navigated to Edge Functions in Supabase
- [ ] Created new function named `validate-session-note`
- [ ] Pasted the function code
- [ ] Deployed the function successfully
- [ ] Function shows as "Active" status
- [ ] Function logs are accessible

## Step 5: Environment Variables
- [ ] Created `.env` file in project root
- [ ] Added `VITE_SUPABASE_URL` with your project URL
- [ ] Added `VITE_SUPABASE_ANON_KEY` with your anon key
- [ ] Verified no extra spaces or quotes in .env
- [ ] File is in the same directory as `package.json`

## Step 6: First Run
- [ ] Ran `npm run dev` in terminal
- [ ] No TypeScript errors shown
- [ ] Server started successfully (usually port 3000)
- [ ] Opened browser to `http://localhost:3000`
- [ ] App loaded without errors
- [ ] No red errors in browser console

## Step 7: Functionality Test
- [ ] Clicked "Add Note" button
- [ ] Navigated to `/new` page
- [ ] Form displays correctly
- [ ] Filled in all fields:
  - [ ] Client name: "Test Client"
  - [ ] Session date: Today's date
  - [ ] Notes: "This is a test note"
  - [ ] Duration: 60
- [ ] Clicked "Save Note"
- [ ] Saw "Validating..." or loading state
- [ ] Received success message
- [ ] Redirected back to home page
- [ ] Note appears in the list

## Step 8: Validation Test
- [ ] Clicked "Add Note" again
- [ ] Entered duration: 10 (should fail)
- [ ] Received error: "Session duration must be between 15 and 120 minutes"
- [ ] Changed duration to 60 (should succeed)
- [ ] Note saved successfully

## Step 9: Delete Test
- [ ] Clicked delete icon on a note
- [ ] Confirmation dialog appeared
- [ ] Clicked "Cancel" - dialog closed, note still there
- [ ] Clicked delete icon again
- [ ] Clicked "Delete" - note removed
- [ ] Success message appeared

## Step 10: Responsive Design Test
- [ ] Opened browser DevTools (F12)
- [ ] Toggled device toolbar (mobile view)
- [ ] Tested on mobile size (375px)
- [ ] Cards stack vertically on mobile
- [ ] Form is usable on mobile
- [ ] Buttons are clickable on mobile

## Troubleshooting

### ❌ "Missing Supabase environment variables"
**Fix**: Check your `.env` file exists and has correct variable names (`VITE_` prefix)

### ❌ "Cannot find module '@supabase/supabase-js'"
**Fix**: Run `npm install` again

### ❌ "Failed to fetch notes"
**Fix**: 
- Verify Supabase URL and key in `.env`
- Check table exists: `SELECT * FROM session_notes;` in SQL Editor
- Ensure RLS is disabled

### ❌ "Validation service unavailable"
**Fix**:
- Check Edge Function is deployed
- Verify function name is exactly `validate-session-note`
- Check function logs in Supabase for errors

### ❌ Port 3000 already in use
**Fix**: 
- Close other apps using port 3000
- Or change port in `vite.config.ts` to 3001

### ❌ TypeScript errors in IDE
**Fix**: 
- Run `npm install` first
- Restart your IDE/editor
- Close and reopen the project

## Verification Commands

### Check Node.js version
```bash
node --version
# Should be v18 or higher
```

### Check npm version
```bash
npm --version
# Should be 9+ or higher
```

### Check if dependencies are installed
```bash
ls node_modules/@supabase
# Should show supabase-js folder
```

### Check if .env file exists
```bash
cat .env
# Should display your environment variables
```

### Test Supabase connection
Open browser console on `http://localhost:3000` and run:
```javascript
console.log(import.meta.env.VITE_SUPABASE_URL);
// Should print your Supabase URL
```

## Success Criteria

Your app is working correctly if:
- ✅ Home page loads without errors
- ✅ You can create notes
- ✅ Notes appear in the list
- ✅ Duration validation works (rejects < 15 or > 120)
- ✅ You can delete notes
- ✅ Confirmation dialog appears before deletion
- ✅ Success/error messages appear
- ✅ App is responsive on mobile

## Next Steps After Setup

1. **Test with real data**: Add several session notes
2. **Test edge cases**: Try 15 min, 120 min, 500 char notes
3. **Explore the code**: Look at components and hooks
4. **Customize**: Change colors, add features
5. **Deploy**: Consider Vercel, Netlify, or Cloudflare Pages

## Optional Enhancements

- [ ] Add sample data to database
- [ ] Enable TypeScript strict mode
- [ ] Set up ESLint rules
- [ ] Add unit tests
- [ ] Configure CI/CD
- [ ] Set up RLS for production
- [ ] Add authentication

## Resources

- **Quick Start**: [QUICKSTART.md](./QUICKSTART.md)
- **Full Setup**: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- **Documentation**: [README.md](./README.md)
- **Project Overview**: [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)

## Get Help

If you're stuck:
1. ✅ Review this checklist
2. 📖 Check the troubleshooting section
3. 🔍 Look at browser console errors
4. 📊 Check Supabase dashboard logs
5. 💬 Review the documentation files

---

**Once all items are checked, you're ready to use the app! 🎉**

Last Updated: 2024

