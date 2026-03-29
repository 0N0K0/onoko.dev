import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function CustomDialog({
  open,
  onClose,
  title,
  content,
  actions,
}: {
  open: boolean;
  onClose?: () => void;
  content: string;
  title?: string;
  actions?: React.ReactNode;
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { elevation: 1 } }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
}
