import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteConfirmationProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  message,
}: DeleteConfirmationProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <p className="text-gray-700">
          Are you sure you want to delete <strong>{message}</strong>? This
          action cannot be undone.
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmation;
