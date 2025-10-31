import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  clientName: string;
  isDeleting: boolean;
}

export function DeleteDialog({
  open,
  onClose,
  onConfirm,
  clientName,
  isDeleting,
}: DeleteDialogProps): JSX.Element {
  const handleConfirm = async (): Promise<void> => {
    await onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={isDeleting ? undefined : onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: 6,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.25rem' }}>
        Delete Session Note?
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ fontSize: '0.95rem' }}>
          Are you sure you want to delete the session note for{' '}
          <strong style={{ color: '#1e293b' }}>{clientName}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
        <Button 
          onClick={onClose} 
          disabled={isDeleting}
          variant="outlined"
          sx={{ 
            fontWeight: 600,
            px: 3,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={20} /> : null}
          sx={{
            fontWeight: 600,
            px: 3,
            boxShadow: 2,
            '&:hover': {
              boxShadow: 3,
            },
          }}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

