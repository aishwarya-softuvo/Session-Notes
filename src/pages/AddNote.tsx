import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Box,
  Button,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NoteForm } from '../components/NoteForm';
import { useSessionNotes } from '../hooks/useSessionNotes';
import { validateSessionNote } from '../supabase/validateSessionNote';
import { SessionNoteInput } from '../types/sessionNote';

export function AddNote(): JSX.Element {
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 2 }}
        >
          Back to Notes
        </Button>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Add New Session Note
        </Typography>
      </Box>

      <NoteForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

