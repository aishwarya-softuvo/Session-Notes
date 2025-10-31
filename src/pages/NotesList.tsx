import React, { useState } from 'react';
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

export function NotesList(): React.JSX.Element {
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
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'background.default',
          zIndex: 9999,
        }}
      >
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 0.5,
            }}
          >
            Session Notes
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
            Manage your therapy session notes
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to="/new"
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          sx={{
            px: 3,
            py: 1.5,
            fontWeight: 600,
            boxShadow: 3,
            '&:hover': {
              boxShadow: 5,
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Add Note
        </Button>
      </Box>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {notes.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 10,
            px: 3,
            backgroundColor: 'background.paper',
            borderRadius: 3,
            border: '2px dashed',
            borderColor: 'divider',
          }}
        >
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              mb: 1,
            }}
          >
            No session notes yet
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 4,
              fontSize: '0.95rem',
            }}
          >
            Start by adding your first session note to track therapy sessions
          </Typography>
          <Button
            component={RouterLink}
            to="/new"
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              boxShadow: 3,
              '&:hover': {
                boxShadow: 5,
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
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

