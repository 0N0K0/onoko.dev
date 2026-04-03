import { Button, TextField } from "@mui/material";
import CustomDialog from "../custom/customDialog";
import { ResponsiveStack } from "../custom/responsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import type {
  Category,
  CategoryFormDialogProps,
} from "../../types/entities/categoryTypes";
import CustomSelect from "../custom/customSelect";
import { useEffect, useState } from "react";

/**
 * Composant de dialogue pour ajouter ou modifier une catégorie
 * @param {boolean | string} props.open Indique si le dialogue est ouvert et, si c'est une string, l'ID de la catégorie à modifier
 * @param {function} props.setOpen Fonction pour ouvrir/fermer le dialogue
 * @param {Category[]} props.categories Liste des catégories existantes (pour sélectionner la catégorie parente)
 * @param {Category | null} props.initialCategory Catégorie initiale avant modification (pour comparer les changements)
 * @param {function} props.setInitialCategory Fonction pour définir la catégorie initiale
 * @param {Category | null} props.editingCategory Catégorie en cours d'édition (pour stocker les modifications)
 * @param {function} props.setEditingCategory Fonction pour définir la catégorie en cours d'édition
 * @param {boolean} props.hasChanges Indique s'il y a des changements non sauvegardés
 * @param {function} props.setHasChanges Fonction pour définir l'état des changements
 * @param {function} props.handleAdd Fonction pour gérer l'ajout d'une nouvelle catégorie
 * @param {function} props.handleEdit Fonction pour gérer la modification d'une catégorie existante
 * @param {boolean} props.submitting Indique si une requête d'ajout/modification est en cours (pour désactiver les boutons)
 */
export default function CategoryFormDialog({
  open,
  setOpen,
  categories,
  handleAdd,
  handleEdit,
  submitting,
}: CategoryFormDialogProps) {
  const [initialCategory, setInitialCategory] = useState<Category | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<Partial<Category> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (open === true) {
      setInitialCategory(null);
      setEditingCategory({
        label: "",
        entity: "",
        description: "",
        parent: "",
      });
      setHasChanges(false);
    } else if (typeof open === "string") {
      const cat = categories?.find((c) => c.id === open) || null;
      setInitialCategory(cat);
      setEditingCategory(cat);
      setHasChanges(false);
    } else if (!open) {
      setInitialCategory(null);
      setEditingCategory(null);
      setHasChanges(false);
    }
  }, [open, categories]);

  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => {
        setOpen(false);
        setInitialCategory(null);
        setEditingCategory(null);
        setHasChanges(false);
      }}
      title={`${typeof open === "string" ? "Modifier la" : "Ajouter une"} catégorie`}
      content={(() => {
        const category =
          typeof open === "string"
            ? categories?.find((c) => c.id === open)
            : null;
        return (
          <ResponsiveStack rowGap={3} style={{ overflow: "visible" }}>
            <TextField
              label="Label"
              value={editingCategory?.label || ""}
              onChange={(e) => {
                setEditingCategory(
                  editingCategory
                    ? { ...editingCategory, label: e.target.value }
                    : null,
                );
                setHasChanges(
                  e.target.value !== (initialCategory?.label || ""),
                );
              }}
              required
            />
            <CustomSelect
              label="Entité"
              labelId="entity-label"
              value={editingCategory?.entity || ""}
              onChange={(e) => {
                setEditingCategory(
                  editingCategory
                    ? { ...editingCategory, entity: e.target.value as string }
                    : null,
                );
                setHasChanges(
                  e.target.value !== (initialCategory?.entity || ""),
                );
              }}
              options={[
                { id: "stack", label: "Technologies" },
                { id: "project", label: "Projets" },
              ]}
            />
            <TextField
              label="Description"
              value={editingCategory?.description || ""}
              onChange={(e) => {
                setEditingCategory(
                  editingCategory
                    ? { ...editingCategory, description: e.target.value }
                    : null,
                );
                setHasChanges(
                  e.target.value !== (initialCategory?.description || ""),
                );
              }}
              multiline
            />
            <CustomSelect
              label="Catégorie parente"
              labelId="parent-category-label"
              value={editingCategory?.parent || ""}
              onChange={(e) => {
                setEditingCategory(
                  editingCategory
                    ? { ...editingCategory, parent: e.target.value as string }
                    : null,
                );
                setHasChanges(
                  e.target.value !== (initialCategory?.parent || ""),
                );
              }}
              options={
                categories
                  ?.filter(
                    (c) =>
                      c.id !== category?.id &&
                      c.entity === editingCategory?.entity,
                  )
                  .map((c) => ({
                    id: c.id,
                    label: c.depth
                      ? "__".repeat(c.depth) + ` ${c.label}`
                      : c.label,
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
            setInitialCategory(null);
            setEditingCategory(null);
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
              handleEdit(editingCategory!);
            } else {
              handleAdd(editingCategory!);
            }
          }}
          disabled={
            submitting ||
            !hasChanges ||
            !editingCategory?.label ||
            !editingCategory?.entity
          }
          startIcon={<Icon path={mdiCheck} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          {typeof open === "string" ? "Modifier" : "Ajouter"}
        </Button>,
      ]}
    />
  );
}
