import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { NoteForm } from '../components/NoteForm';
import { useSessionNotes } from '../hooks/useSessionNotes';
import { validateSessionNote } from '../supabase/validateSessionNote';
import { SessionNoteInput } from '../types/sessionNote';

export function AddNote(): React.JSX.Element {
  const navigate = useNavigate();
  const { addNote } = useSessionNotes();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubmit = async (noteData: SessionNoteInput): Promise<void> => {
    setIsSubmitting(true);

    try {
      // Validate using edge function
      const validation = await validateSessionNote(noteData);

      if (!validation.valid) {
        setSnackbar({
          open: true,
          message: validation.error || 'Validation failed',
          severity: 'error',
        });
        setIsSubmitting(false);
        return;
      }

      // Add note to database
      const newNote = await addNote(noteData);

      if (newNote) {
        setSnackbar({
          open: true,
          message: 'Session note added successfully!',
          severity: 'success',
        });

        // Navigate back to list after a short delay
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to add note. Please try again.',
          severity: 'error',
        });
        setIsSubmitting(false);
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: 'An unexpected error occurred. Please try again.',
        severity: 'error',
      });
      setIsSubmitting(false);
    }
  };

  const handleSnackbarClose = (): void => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Add New Session Note
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
          Fill in the details of your therapy session
        </Typography>
      </Box>

      <NoteForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 2 }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: '100%',
            minWidth: '300px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            '& .MuiAlert-icon': {
              fontSize: '24px',
            },
          }}
          elevation={6}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

