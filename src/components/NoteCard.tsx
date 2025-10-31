import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Box,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { SessionNote } from '../types/sessionNote';

interface NoteCardProps {
  note: SessionNote;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps): React.JSX.Element {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateNotes = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              fontSize: '1.125rem',
            }}
          >
            {note.client_name}
          </Typography>
          <Chip
            label={`${note.duration} min`}
            size="small"
            color="primary"
            sx={{ 
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />
        </Box>

        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            fontWeight: 500,
            fontSize: '0.875rem',
          }}
        >
          {formatDate(note.session_date)}
        </Typography>

        <Typography 
          variant="body2" 
          color="text.primary"
          sx={{ 
            lineHeight: 1.6,
            fontSize: '0.875rem',
          }}
        >
          {truncateNotes(note.notes, 100)}
        </Typography>
      </CardContent>

      <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 2, pt: 0 }}>
        <IconButton
          aria-label="delete note"
          onClick={() => onDelete(note.id)}
          color="error"
          size="small"
          sx={{
            '&:hover': {
              backgroundColor: 'error.light',
              color: 'white',
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

