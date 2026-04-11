import { Button, TextField } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import type {
  Stack,
  StackFormDialogProps,
} from "../../types/entities/stackTypes";
import { useCategory } from "../../hooks/useCategory";
import CustomSelect from "../custom/CustomSelect";
import { useEffect, useState } from "react";
import FieldsRepeater from "../custom/FieldsRepeater";
import type { Category } from "../../types/entities/categoryTypes";

export default function StackFormDialog({
  open,
  setOpen,
  stacks,
  handleAdd,
  handleEdit,
  submitting,
}: StackFormDialogProps) {
  const { categories } = useCategory();

  const [initialStack, setInitialStack] = useState<Stack | null>(null);
  const [editingStack, setEditingStack] = useState<Partial<
    Stack & { iconFile?: File | null }
  > | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (open === true) {
      setInitialStack(null);
      setEditingStack({
        label: "",
        description: "",
        versions: [],
        skills: [],
        category: "",
      });
      setHasChanges(false);
    } else if (typeof open === "string") {
      const stack = stacks?.find((s) => s.id === open) || null;
      setInitialStack(stack);
      setEditingStack(stack);
      setHasChanges(false);
    } else if (!open) {
      setInitialStack(null);
      setEditingStack(null);
      setHasChanges(false);
    }
  }, [open, stacks]);

  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => {
        (setOpen(false),
          setInitialStack(null),
          setEditingStack(null),
          setHasChanges(false));
      }}
      title={`${
        typeof open === "string" ? "Modifier la" : "Ajouter une"
      } technologie`}
      content={(() => {
        return (
          <ResponsiveStack rowGap={3} style={{ overflow: "visible" }}>
            <ResponsiveStack
              columnGap={2}
              rowGap={3}
              direction="row"
              flexWrap="wrap"
            >
              {/* @TODO : MediaPicker */}
              <TextField
                label="Label"
                value={editingStack?.label || ""}
                onChange={(e) => {
                  setEditingStack(
                    editingStack
                      ? { ...editingStack, label: e.target.value }
                      : null,
                  );
                  e.target.value !== (editingStack?.label || "") &&
                    setHasChanges(true);
                }}
                required
                fullWidth={false}
                sx={{ flex: "1 0 208px" }}
              />
              <CustomSelect
                label="Catégorie"
                labelId="category-label"
                value={
                  typeof editingStack?.category === "string"
                    ? editingStack.category
                    : editingStack?.category?.id || ""
                }
                onChange={(e) => {
                  const nextValue =
                    typeof e.target === "object" &&
                    e.target !== null &&
                    "value" in e.target
                      ? e.target.value
                      : "";
                  const categoryValue = Array.isArray(nextValue)
                    ? (nextValue[0] ?? "")
                    : nextValue;

                  setEditingStack(
                    editingStack
                      ? { ...editingStack, category: categoryValue as string }
                      : null,
                  );
                  categoryValue !==
                    (typeof initialStack?.category === "string"
                      ? initialStack.category
                      : initialStack?.category?.id || "") &&
                    setHasChanges(true);
                }}
                options={
                  categories
                    ?.filter((c: Category) => c.entity === "stack")
                    .map((c: Category) => ({
                      id: c.id,
                      label: c.depth
                        ? "__".repeat(c.depth) + ` ${c.label}`
                        : c.label,
                    })) || []
                }
                sx={{ flex: "1 0 208px" }}
                fullWidth={false}
              />
            </ResponsiveStack>
            <TextField
              label="Description"
              value={editingStack?.description || ""}
              onChange={(e) => {
                setEditingStack(
                  editingStack
                    ? { ...editingStack, description: e.target.value }
                    : null,
                );
                e.target.value !== (initialStack?.description || "") &&
                  setHasChanges(true);
              }}
              multiline
            />
            <FieldsRepeater
              label={{ title: "Versions", add: "une version" }}
              editingItem={editingStack}
              values="versions"
              setEditingItem={setEditingStack}
              setHasChanges={setHasChanges}
              fields={(value, idx, onChange) => (
                <TextField
                  placeholder={`Version ${idx + 1}`}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                />
              )}
              minWidth="256px"
            />
            <FieldsRepeater
              label={{ title: "Compétences", add: "une compétence" }}
              editingItem={editingStack}
              values="skills"
              setEditingItem={setEditingStack}
              setHasChanges={setHasChanges}
              fields={(value, idx, onChange) => (
                <TextField
                  placeholder={`Compétence ${idx + 1}`}
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  multiline
                />
              )}
            />
          </ResponsiveStack>
        );
      })()}
      actions={[
        <Button
          key="cancel"
          onClick={() => {
            setOpen(false);
            setInitialStack(null);
            setEditingStack(null);
            setHasChanges(false);
          }}
          disabled={submitting}
          startIcon={<Icon path={mdiClose} size={1} />}
          sx={{ width: "fit-content", minWidth: "208px" }}
        >
          Annuler
        </Button>,
        <Button
          key="confirm"
          color="success"
          onClick={() => {
            if (typeof open === "string") {
              handleEdit(editingStack!);
            } else {
              handleAdd(editingStack!);
            }
          }}
          disabled={
            submitting ||
            !hasChanges ||
            !editingStack?.label ||
            !editingStack?.icon
          }
          startIcon={<Icon path={mdiCheck} size={1} />}
          sx={{ width: "fit-content", minWidth: "208px" }}
        >
          {typeof open === "string" ? "Modifier" : "Ajouter"}
        </Button>,
      ]}
      width={12}
    />
  );
}
