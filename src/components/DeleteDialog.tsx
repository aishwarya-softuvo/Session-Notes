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
    >
      <DialogTitle>Delete Session Note?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the session note for{' '}
          <strong>{clientName}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="error"
          variant="contained"
          disabled={isDeleting}
          startIcon={isDeleting ? <CircularProgress size={20} /> : null}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

