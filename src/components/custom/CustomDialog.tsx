import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { useResponsiveWidth } from "../../hooks/layout/useResponsiveWidth";
import type { CustomDialogProps } from "../../types/components/baseComponentTypes";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

/**
 * Composant générique de dialogue personnalisé utilisant MUI Dialog
 * @param {boolean} props.open Indique si le dialogue est ouvert
 * @param {function} props.onClose Fonction pour fermer le dialogue
 * @param {string} props.title Titre du dialogue (optionnel)
 * @param {string} props.titlePaddingBottom Padding inférieur du titre (optionnel)
 * @param {React.ReactNode} props.content Contenu du dialogue (peut être une string ou un composant React)
 * @param {React.ReactNode} props.actions Actions du dialogue (boutons, etc., optionnel)
 */
export default function CustomDialog({
  open,
  onClose,
  title,
  titlePaddingBottom,
  content,
  actions,
  width = 4,
  closeButton = false,
}: CustomDialogProps) {
  const dialogWidth = useResponsiveWidth(width);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{ paper: { elevation: 1 } }}
      sx={{
        "& .MuiDialog-paper": {
          width: dialogWidth,
          paddingTop: closeButton ? "3rem" : undefined,
          paddingX: closeButton ? "3rem" : undefined,
        },
      }}
    >
      {closeButton && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <Icon path={mdiClose} size={1} />
        </IconButton>
      )}
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
