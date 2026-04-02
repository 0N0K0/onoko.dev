import { Button, TextField } from "@mui/material";
import CustomDialog from "../custom/customDialog";
import { ResponsiveStack } from "../custom/responsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import type { RoleFormDialogProps } from "../../types/roleTypes";

export default function RoleFormDialog({
  open,
  setOpen,
  initialRole,
  setInitialRole,
  editingRole,
  setEditingRole,
  hasChanges,
  setHasChanges,
  handleAdd,
  handleEdit,
  submitting,
}: RoleFormDialogProps) {
  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => {
        (setOpen(false),
          setInitialRole(null),
          setEditingRole(null),
          setHasChanges(false));
      }}
      title={`${typeof open === "string" ? "Modifier le" : "Ajouter un"} rôle`}
      content={(() => {
        return (
          <ResponsiveStack rowGap={3} style={{ overflow: "visible" }}>
            <TextField
              label="Label"
              value={editingRole?.label || ""}
              onChange={(e) => {
                setEditingRole(
                  editingRole
                    ? { ...editingRole, label: e.target.value }
                    : null,
                );
                e.target.value !== (initialRole?.label || "") &&
                  setHasChanges(true);
              }}
              required
            />
          </ResponsiveStack>
        );
      })()}
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
          color="success"
          onClick={typeof open === "string" ? handleEdit : handleAdd}
          disabled={submitting || !hasChanges || !editingRole?.label}
          startIcon={<Icon path={mdiCheck} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          {typeof open === "string" ? "Modifier" : "Ajouter"}
        </Button>,
      ]}
    />
  );
}
