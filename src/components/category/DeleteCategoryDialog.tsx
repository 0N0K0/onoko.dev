import { Button } from "@mui/material";
import CustomDialog from "../custom/customDialog";
import Icon from "@mdi/react";
import { mdiClose, mdiDelete } from "@mdi/js";

export default function DeleteCategoryDialog({
  open,
  setOpen,
  selectedCategories,
  handleDelete,
  submitting,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedCategories: string[];
  handleDelete: () => void;
  submitting: boolean;
}) {
  return (
    <CustomDialog
      key="deleteDialog"
      open={open}
      onClose={() => setOpen(false)}
      title={`Voulez-vous supprimer ${selectedCategories.length > 1 ? "ces" : "cette"}\u00A0${selectedCategories.length > 1 ? "catégories" : "catégorie"}\u00A0?`}
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
            handleDelete();
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
