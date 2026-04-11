import { Button, TextField } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import CustomSelect from "../custom/CustomSelect";
import type {
  Coworker,
  CoworkerFormDialogProps,
} from "../../types/entities/cowokerTypes";
import { useRole } from "../../hooks/useRole";
import type { Role } from "../../types/entities/roleTypes";
import { useEffect, useState } from "react";

export default function CoworkerFormDialog({
  open,
  setOpen,
  coworkers,
  handleAdd,
  handleEdit,
  submitting,
}: CoworkerFormDialogProps) {
  const { roles } = useRole();

  // State local pour le formulaire
  const [initialCoworker, setInitialCoworker] = useState<Coworker | null>(null);
  const [editingCoworker, setEditingCoworker] =
    useState<Partial<Coworker> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  // Réinitialise le formulaire à l'ouverture
  useEffect(() => {
    if (open === true) {
      setInitialCoworker(null);
      setEditingCoworker({
        name: "",
        roles: [],
      });
      setHasChanges(false);
    } else if (typeof open === "string") {
      const coworker = coworkers?.find((c) => c.id === open) || null;
      setInitialCoworker(coworker);
      setEditingCoworker(coworker);
      setHasChanges(false);
    } else if (!open) {
      setInitialCoworker(null);
      setEditingCoworker(null);
      setHasChanges(false);
    }
  }, [open, coworkers]);

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
                const nextValue =
                  typeof e.target === "object" &&
                  e.target !== null &&
                  "value" in e.target
                    ? e.target.value
                    : "";
                const value = Array.isArray(nextValue)
                  ? nextValue
                  : [nextValue];
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
                roles?.map((r: Role) => ({
                  id: r.id,
                  label: r.label,
                })) || []
              }
            />
          </ResponsiveStack>
        );
      })()}
      actions={[
        <Button
          key="cancel"
          onClick={() => {
            setOpen(false);
            setInitialCoworker(null);
            setEditingCoworker(null);
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
              handleEdit(editingCoworker!);
            } else {
              handleAdd(editingCoworker!);
            }
          }}
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
