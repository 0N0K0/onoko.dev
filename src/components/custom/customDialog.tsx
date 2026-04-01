import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useResponsiveWidth } from "../../hooks/layout/useResponsiveWidth";

export default function CustomDialog({
  open,
  onClose,
  title,
  titlePaddingBottom,
  content,
  actions,
}: {
  open: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  title?: string;
  titlePaddingBottom?: string;
  actions?: React.ReactNode;
}) {
  const dialogWidth = useResponsiveWidth(4);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { elevation: 1 } }}
      sx={{
        "& .MuiDialog-paper": {
          width: dialogWidth,
        },
      }}
    >
      {title && (
        <DialogTitle
          sx={
            titlePaddingBottom
              ? { paddingBottom: titlePaddingBottom }
              : undefined
          }
        >
          {title}
        </DialogTitle>
      )}
      <DialogContent>
        {typeof content === "string" ? (
          <DialogContentText>{content}</DialogContentText>
        ) : (
          content
        )}
      </DialogContent>
      {actions && (
        <DialogActions
          sx={{ flexWrap: "wrap-reverse", rowGap: 0, columnGap: 1 }}
        >
          {actions}
        </DialogActions>
      )}
    </Dialog>
  );
}
