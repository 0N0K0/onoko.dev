import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import CustomDialog from "../custom/customDialog";
import { ResponsiveStack } from "../custom/responsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import type { CategoryFormDialogProps } from "../../types/categoryTypes";

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
  initialCategory,
  setInitialCategory,
  editingCategory,
  setEditingCategory,
  hasChanges,
  setHasChanges,
  handleAdd,
  handleEdit,
  submitting,
}: CategoryFormDialogProps) {
  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => {
        (setOpen(false),
          setInitialCategory(null),
          setEditingCategory(null),
          setHasChanges(false));
      }}
      title={`${
        typeof open === "string" ? "Modifier la" : "Ajouter une"
      } catégorie`}
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
                e.target.value !== (editingCategory?.label || "") &&
                  setHasChanges(true);
              }}
              required
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="entity-label" required>
                Entité
              </InputLabel>
              <Select
                labelId="entity-label"
                label="Entité"
                value={editingCategory?.entity || ""}
                onChange={(e) => {
                  setEditingCategory(
                    editingCategory
                      ? { ...editingCategory, entity: e.target.value }
                      : null,
                  );
                  e.target.value !== (initialCategory?.entity || "") &&
                    setHasChanges(true);
                }}
                required
                fullWidth
              >
                <MenuItem value="stack">Technologies</MenuItem>
                <MenuItem value="project">Projets</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Description"
              value={editingCategory?.description || ""}
              onChange={(e) => {
                setEditingCategory(
                  editingCategory
                    ? { ...editingCategory, description: e.target.value }
                    : null,
                );
                e.target.value !== (initialCategory?.description || "") &&
                  setHasChanges(true);
              }}
              multiline
              rows={4}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="parent-category-label">
                Catégorie parente
              </InputLabel>
              <Select
                labelId="parent-category-label"
                label="Catégorie parente"
                value={editingCategory?.parent || ""}
                onChange={(e) => {
                  setEditingCategory(
                    editingCategory
                      ? { ...editingCategory, parent: e.target.value }
                      : null,
                  );
                  e.target.value !== (initialCategory?.parent || "") &&
                    setHasChanges(true);
                }}
                fullWidth
              >
                <MenuItem value="">Aucune</MenuItem>
                {categories
                  ?.filter((c) => c.id !== category?.id)
                  .map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.label}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
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
