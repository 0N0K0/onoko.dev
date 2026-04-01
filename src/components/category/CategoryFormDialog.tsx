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
import type { Category } from "../../types/categoryTypes";

export default function CategoryFormDialog({
  open,
  setOpen,
  categories,
  initialCategory,
  setInitialCategory,
  label,
  setLabel,
  entity,
  setEntity,
  description,
  setDescription,
  parent,
  setParent,
  hasChanges,
  setHasChanges,
  handleAdd,
  handleEdit,
  submitting,
}: {
  open: boolean | string;
  setOpen: (open: boolean | string) => void;
  categories: Category[] | undefined;
  initialCategory: Category | null;
  setInitialCategory: (category: Category | null) => void;
  label: string;
  setLabel: (label: string) => void;
  entity: string;
  setEntity: (entity: string) => void;
  description: string;
  setDescription: (description: string) => void;
  parent: string;
  setParent: (parentId: string) => void;
  hasChanges: boolean;
  setHasChanges: (hasChanges: boolean) => void;
  handleAdd: () => void;
  handleEdit: () => void;
  submitting: boolean;
}) {
  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => {
        (setOpen(false),
          setInitialCategory(null),
          setLabel(""),
          setEntity(""),
          setDescription(""),
          setParent(""),
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
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
                e.target.value !== (initialCategory?.label || "") &&
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
                value={entity}
                onChange={(e) => {
                  setEntity(e.target.value);
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
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
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
                value={parent}
                onChange={(e) => {
                  setParent(e.target.value);
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
          disabled={submitting || !hasChanges || !label || !entity}
          startIcon={<Icon path={mdiCheck} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          {typeof open === "string" ? "Modifier" : "Ajouter"}
        </Button>,
      ]}
    />
  );
}
