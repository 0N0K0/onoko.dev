import { Button, TextField } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import type { Role, RoleFormDialogProps } from "../../types/entities/roleTypes";
import useFormDialog from "../../hooks/useFormDialog";

/**
 * Composant de dialogue pour ajouter ou modifier un rôle.
 * Ce composant affiche un formulaire dans un dialogue personnalisé, permettant à l'utilisateur de saisir les informations d'un rôle, telles que son label.
 * Il gère à la fois les cas d'ajout et de modification en fonction de la valeur de la prop `open`, qui peut être un booléen ou une chaîne de caractères représentant l'ID d'un rôle existant.
 * Le composant utilise des états locaux pour gérer les données du formulaire et détecter les changements, ainsi que des hooks personnalisés pour récupérer les rôles disponibles.
 * @param {Object} props Les propriétés du composant.
 * @param {boolean | string} props.open Indique si le dialogue est ouvert ou fermé, ou contient l'ID d'un rôle à modifier.
 * @param {function} props.setOpen Fonction pour changer l'état d'ouverture du dialogue.
 * @param {Role[]} props.roles La liste des rôles existants, utilisée pour pré-remplir le formulaire en cas de modification.
 * @param {function} props.handleAdd Fonction à appeler pour ajouter un nouveau rôle avec les données du formulaire.
 * @param {function} props.handleEdit Fonction à appeler pour modifier un rôle existant avec les données du formulaire.
 * @param {boolean} props.submitting Indique si une opération de soumission est en cours, utilisé pour désactiver les actions du dialogue pendant la soumission.
 */
export default function RoleFormDialog({
  open,
  setOpen,
  roles,
  handleAdd,
  handleEdit,
  submitting,
}: RoleFormDialogProps) {
  const {
    initialItem: initialRole,
    editingItem: editingRole,
    setEditingItem: setEditingRole,
    hasChanges,
    setHasChanges,
  } = useFormDialog<Role>({
    open,
    items: roles,
    defaults: { label: "" },
  });

  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => setOpen(false)}
      title={`${typeof open === "string" ? "Modifier le" : "Ajouter un"} rôle`}
      content={(() => {
        return (
          <ResponsiveStack rowGap={3} sx={{ overflow: "visible" }}>
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
          onClick={() => {
            if (typeof open === "string" && editingRole?.id) {
              const input = editingRole;
              delete input.id;
              delete (input as any).__typename;
              handleEdit({
                variables: { id: open, input },
              });
            } else {
              handleAdd({ variables: { input: editingRole! } });
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
