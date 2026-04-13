import { Button, TextField } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import CustomSelect from "../custom/CustomSelect";
import type {
  Coworker,
  CoworkerFormDialogProps,
} from "../../types/entities/coworkerTypes";
import type { Role } from "../../types/entities/roleTypes";
import { useEffect, useState } from "react";
import useRoles from "../../hooks/queries/useRoles";

/**
 * Composant de dialogue pour ajouter ou modifier un intervenant (coworker).
 * Ce composant affiche un formulaire dans un dialogue personnalisé, permettant à l'utilisateur de saisir les informations d'un intervenant, telles que son nom et ses rôles associés.
 * Il gère à la fois les cas d'ajout et de modification en fonction de la valeur de la prop `open`, qui peut être un booléen ou une chaîne de caractères représentant l'ID d'un intervenant existant.
 * Le composant utilise des états locaux pour gérer les données du formulaire et détecter les changements, ainsi que des hooks personnalisés pour récupérer les rôles disponibles.
 * @param {Object} props Les propriétés du composant.
 * @param {boolean | string} props.open Indique si le dialogue est ouvert ou fermé, ou contient l'ID d'un intervenant à modifier.
 * @param {function} props.setOpen Fonction pour changer l'état d'ouverture du dialogue.
 * @param {Coworker[]} props.coworkers La liste des intervenants existants, utilisée pour pré-remplir le formulaire en cas de modification.
 * @param {function} props.handleAdd Fonction à appeler pour ajouter un nouvel intervenant avec les données du formulaire.
 * @param {function} props.handleEdit Fonction à appeler pour modifier un intervenant existant avec les données du formulaire.
 * @param {boolean} props.submitting Indique si une opération de soumission est en cours, utilisé pour désactiver les actions du dialogue pendant la soumission.
 */
export default function CoworkerFormDialog({
  open,
  setOpen,
  coworkers,
  handleAdd,
  handleEdit,
  submitting,
}: CoworkerFormDialogProps) {
  const { roles } = useRoles();

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
              handleEdit({ variables: editingCoworker! });
            } else {
              handleAdd({ variables: editingCoworker! });
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
