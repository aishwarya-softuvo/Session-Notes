import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSessionNotes } from '../hooks/useSessionNotes';
import { NoteCard } from '../components/NoteCard';
import { DeleteDialog } from '../components/DeleteDialog';
import { SessionNote } from '../types/sessionNote';

export function NotesList(): JSX.Element {
  const { notes, loading, error, deleteNote } = useSessionNotes();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<SessionNote | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleDeleteClick = (id: string): void => {
    const note = notes.find((n) => n.id === id);
    if (note) {
      setNoteToDelete(note);
      setDeleteDialogOpen(true);
    }
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    if (!noteToDelete) return;

    setIsDeleting(true);
    const success = await deleteNote(noteToDelete.id);
    setIsDeleting(false);

    if (success) {
      setSnackbar({
        open: true,
        message: 'Note deleted successfully',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to delete note',
        severity: 'error',
      });
    }

    setDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  const handleDeleteCancel = (): void => {
    setDeleteDialogOpen(false);
    setNoteToDelete(null);
  };

  const handleSnackbarClose = (): void => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Session Notes
        </Typography>
        <Button
          component={RouterLink}
          to="/new"
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
        >
          Add Note
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {notes.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No session notes yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Start by adding your first session note
          </Typography>
          <Button
            component={RouterLink}
            to="/new"
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
          >
            Add Your First Note
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <NoteCard note={note} onDelete={handleDeleteClick} />
            </Grid>
          ))}
        </Grid>
      )}

      {noteToDelete && (
        <DeleteDialog
          open={deleteDialogOpen}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          clientName={noteToDelete.client_name}
          isDeleting={isDeleting}
        />
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
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

