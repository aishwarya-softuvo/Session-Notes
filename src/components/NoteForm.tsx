import { useState, FormEvent, ChangeEvent } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
} from '@mui/material';
import { SessionNoteInput } from '../types/sessionNote';

interface NoteFormProps {
  onSubmit: (note: SessionNoteInput) => Promise<void>;
  isSubmitting: boolean;
}

export function NoteForm({ onSubmit, isSubmitting }: NoteFormProps): JSX.Element {
  const [formData, setFormData] = useState<SessionNoteInput>({
    client_name: '',
    session_date: new Date().toISOString().split('T')[0],
    notes: '',
    duration: 60,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof SessionNoteInput, string>>>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'duration' ? parseInt(value, 10) || 0 : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof SessionNoteInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof SessionNoteInput, string>> = {};

    if (!formData.client_name.trim()) {
      newErrors.client_name = 'Client name is required';
    }

    if (!formData.session_date) {
      newErrors.session_date = 'Session date is required';
    }

    if (!formData.notes.trim()) {
      newErrors.notes = 'Notes are required';
    } else if (formData.notes.length > 500) {
      newErrors.notes = 'Notes must not exceed 500 characters';
    }

    if (!formData.duration || formData.duration <= 0) {
      newErrors.duration = 'Duration must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    await onSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
        Add Session Note
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          label="Client Name"
          name="client_name"
          value={formData.client_name}
          onChange={handleChange}
          error={!!errors.client_name}
          helperText={errors.client_name}
          margin="normal"
          required
          disabled={isSubmitting}
        />

        <TextField
          fullWidth
          label="Session Date"
          name="session_date"
          type="date"
          value={formData.session_date}
          onChange={handleChange}
          error={!!errors.session_date}
          helperText={errors.session_date}
          margin="normal"
          required
          disabled={isSubmitting}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          fullWidth
          label="Session Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          error={!!errors.notes}
          helperText={errors.notes || `${formData.notes.length}/500 characters`}
          margin="normal"
          required
          multiline
          rows={6}
          disabled={isSubmitting}
        />

        <TextField
          fullWidth
          label="Duration (minutes)"
          name="duration"
          type="number"
          value={formData.duration}
          onChange={handleChange}
          error={!!errors.duration}
          helperText={errors.duration}
          margin="normal"
          required
          disabled={isSubmitting}
          inputProps={{
            min: 1,
            max: 300,
          }}
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          >
            {isSubmitting ? 'Saving...' : 'Save Note'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

