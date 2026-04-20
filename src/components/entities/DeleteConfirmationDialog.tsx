import { Button } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import Icon from "@mdi/react";
import { mdiClose, mdiDelete } from "@mdi/js";
import type { DeleteConfirmationDialogProps } from "../../types/entities/entityTypes";

/**
 * Composant de dialogue de confirmation de suppression
 * Affiche un message de confirmation avant de supprimer une entité, avec des actions pour annuler ou confirmer la suppression
 * @param {string} props.label Label de l'entité à supprimer (ex: "cette catégorie")
 * @param {boolean} props.open Indique si le dialogue est ouvert
 * @param {function} props.setOpen Fonction pour ouvrir/fermer le dialogue
 * @param {function} props.onClickDelete Fonction à appeler lors de la confirmation de la suppression
 * @param {boolean} props.submitting Indique si une action de suppression est en cours (pour désactiver les boutons)
 */
export default function DeleteConfirmationDialog({
  label,
  open,
  setOpen,
  onClickDelete,
  submitting,
}: DeleteConfirmationDialogProps) {
  return (
    <CustomDialog
      key="deleteDialog"
      open={open}
      onClose={() => setOpen(false)}
      title={`Voulez-vous supprimer ${label}\u00A0?`}
      titlePaddingBottom="0px"
      content="Cette action est irréversible et supprimera toutes les données associées."
      actions={[
        <Button
          key="cancel"
          onClick={() => setOpen(false)}
          disabled={submitting}
          startIcon={<Icon path={mdiClose} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          Annuler
        </Button>,
        <Button
          key="confirm"
          color="error"
          onClick={() => {
            onClickDelete();
            setOpen(false);
          }}
          disabled={submitting}
          startIcon={<Icon path={mdiDelete} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          Supprimer
        </Button>,
      ]}
    />
  );
}
