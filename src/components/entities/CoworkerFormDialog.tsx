import { Button, TextField } from "@mui/material";
import CustomDialog from "../custom/customDialog";
import { ResponsiveStack } from "../custom/responsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import CustomSelect from "../custom/customSelect";
import type { CoworkerFormDialogProps } from "../../types/cowokerTypes";
import { useRole } from "../../hooks/useRole";
import type { Role } from "../../types/roleTypes";

export default function CoworkerFormDialog({
  open,
  setOpen,
  initialCoworker,
  setInitialCoworker,
  editingCoworker,
  setEditingCoworker,
  hasChanges,
  setHasChanges,
  handleAdd,
  handleEdit,
  submitting,
}: CoworkerFormDialogProps) {
  const { roles } = useRole();

  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => {
        (setOpen(false),
          setInitialCoworker(null),
          setEditingCoworker(null),
          setHasChanges(false));
      }}
      title={`${
        typeof open === "string" ? "Modifier l'" : "Ajouter un "
      }intervenant`}
      content={(() => {
        return (
          <ResponsiveStack rowGap={3} style={{ overflow: "visible" }}>
            <TextField
              label="Nom"
              value={editingCoworker?.name || ""}
              onChange={(e) => {
                setEditingCoworker(
                  editingCoworker
                    ? { ...editingCoworker, name: e.target.value }
                    : null,
                );
                e.target.value !== (initialCoworker?.name || "") &&
                  setHasChanges(true);
              }}
              required
            />
            <CustomSelect
              label="Rôles"
              labelId="roles-label"
              value={
                editingCoworker?.roles?.map((r) =>
                  typeof r === "string" ? r : (r as Role).id,
                ) || []
              }
              onChange={(e) => {
                const value = Array.isArray(e.target.value)
                  ? e.target.value
                  : [e.target.value];
                setEditingCoworker(
                  editingCoworker ? { ...editingCoworker, roles: value } : null,
                );
                const initial = Array.isArray(initialCoworker?.roles)
                  ? initialCoworker.roles
                  : [];
                const changed =
                  JSON.stringify(value) !== JSON.stringify(initial);
                changed && setHasChanges(true);
              }}
              options={
                roles?.map((r) => ({
                  id: r.id,
                  label: r.label,
                })) || []
              }
              multiple
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
          disabled={submitting || !hasChanges || !editingCoworker?.name}
          startIcon={<Icon path={mdiCheck} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          {typeof open === "string" ? "Modifier" : "Ajouter"}
        </Button>,
      ]}
    />
  );
}
