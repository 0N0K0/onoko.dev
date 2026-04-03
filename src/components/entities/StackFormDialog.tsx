import { Button, TextField, useTheme } from "@mui/material";
import CustomDialog from "../custom/customDialog";
import { ResponsiveBox, ResponsiveStack } from "../custom/responsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose, mdiPencil } from "@mdi/js";
import type {
  Stack,
  StackFormDialogProps,
} from "../../types/entities/stackTypes";
import { useCategory } from "../../hooks/useCategory";
import CustomSelect from "../custom/customSelect";
import Dropzone from "react-dropzone";
import ResponsiveBodyTypography from "../custom/responsiveBodyTypography";
import CustomIconButton from "../custom/customIconButton";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/apiConstants";
import FieldsRepeater from "../custom/fieldsRepeater";
import type { Category } from "../../types/entities/categoryTypes";

export default function StackFormDialog({
  open,
  setOpen,
  stacks,
  handleAdd,
  handleEdit,
  submitting,
}: StackFormDialogProps) {
  const theme = useTheme();
  const { categories } = useCategory();

  const [initialStack, setInitialStack] = useState<Stack | null>(null);
  const [editingStack, setEditingStack] = useState<Partial<
    Stack & { iconFile?: File | null }
  > | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [editIcon, setEditIcon] = useState(false);

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

  useEffect(() => {
    if (editingStack?.iconFile || editingStack?.iconUrl) {
      setEditIcon(false);
    } else {
      setEditIcon(true);
    }
  }, [editingStack?.iconFile, editingStack?.iconUrl]);

  const handleDropIcon = (files: File[]) => {
    if (files && files.length > 0) {
      setEditingStack(
        editingStack ? { ...editingStack, iconFile: files[0] } : null,
      );
      setHasChanges(true);
    }
  };

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
            {(editingStack?.iconUrl || editingStack?.iconFile) && (
              <ResponsiveBox
                padding={0}
                sx={{
                  position: "relative",
                  width: "fit-content",
                  margin: "0 auto",
                }}
              >
                <img
                  src={
                    editingStack.iconFile
                      ? URL.createObjectURL(editingStack.iconFile)
                      : API_URL + editingStack.iconUrl
                  }
                  style={{
                    width: "6rem",
                    height: "6rem",
                    objectFit: "contain",
                  }}
                />
                <CustomIconButton
                  icon={editIcon ? mdiClose : mdiPencil}
                  color="primary"
                  sx={{ position: "absolute", bottom: "-20px", right: "-20px" }}
                  onClick={() => setEditIcon(!editIcon)}
                  disabled={submitting}
                />
              </ResponsiveBox>
            )}
            {((!editingStack?.iconUrl && !editingStack?.iconFile) ||
              editIcon) && (
              <Dropzone
                onDrop={(acceptedFiles) => {
                  handleDropIcon(acceptedFiles);
                  setEditIcon(false);
                }}
                accept={{
                  "image/*": [".webp", ".png", ".jpg", ".jpeg", ".svg"],
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <ResponsiveBox
                    paddingY={3}
                    paddingX={4}
                    {...getRootProps()}
                    sx={{
                      border: "2px dashed " + theme.palette.divider,
                      borderRadius: "8px",
                      textAlign: "center",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                        border: "2px dashed " + theme.palette.text.secondary,
                      },
                    }}
                  >
                    <input {...getInputProps()} />
                    <ResponsiveBodyTypography
                      variant="bodySm"
                      color="textSecondary"
                    >
                      Glisser l'icone&nbsp;ici, ou&nbsp;cliquer
                      pour&nbsp;sélectionner un&nbsp;fichier
                    </ResponsiveBodyTypography>
                  </ResponsiveBox>
                )}
              </Dropzone>
            )}
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
            />
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

            <CustomSelect
              label="Catégorie"
              labelId="category-label"
              value={
                typeof editingStack?.category === "string"
                  ? editingStack.category
                  : editingStack?.category?.id || ""
              }
              onChange={(e) => {
                setEditingStack(
                  editingStack
                    ? { ...editingStack, category: e.target.value as string }
                    : null,
                );
                e.target.value !==
                  (typeof initialStack?.category === "string"
                    ? initialStack.category
                    : initialStack?.category?.id || "") && setHasChanges(true);
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
          sx={{ flex: "1 1 auto" }}
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
            (!editingStack?.iconFile && !editingStack?.iconUrl)
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
