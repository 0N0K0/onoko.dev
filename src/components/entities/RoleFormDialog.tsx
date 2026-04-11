import { Button, TextField } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import type { Role, RoleFormDialogProps } from "../../types/entities/roleTypes";
import { useEffect, useState } from "react";

export default function RoleFormDialog({
  open,
  setOpen,
  roles,
  handleAdd,
  handleEdit,
  submitting,
}: RoleFormDialogProps) {
  const [initialRole, setInitialRole] = useState<Role | null>(null);
  const [editingRole, setEditingRole] = useState<Partial<Role> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (open === true) {
      setInitialRole(null);
      setEditingRole({
        label: "",
      });
      setHasChanges(false);
    } else if (typeof open === "string") {
      const role = roles?.find((r) => r.id === open) || null;
      setInitialRole(role);
      setEditingRole(role);
      setHasChanges(false);
    } else if (!open) {
      setInitialRole(null);
      setEditingRole(null);
      setHasChanges(false);
    }
  }, [open, roles]);

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
          onClick={() => {
            setOpen(false);
            setInitialRole(null);
            setEditingRole(null);
            setHasChanges(false);
          }}
          disabled={submitting}
          startIcon={<Icon path={mdiClose} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          Annuler
        </Button>,
        <Button
          key="confirm"
          color="success"
          onClick={() => {
            if (typeof open === "string") {
              handleEdit(editingRole!);
            } else {
              handleAdd(editingRole!);
            }
          }}
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
