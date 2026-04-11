import { useEffect, useState } from "react";
import CustomDialog from "../../custom/CustomDialog";
import type { Media } from "../../../types/entities/mediaTypes";
import Picture from "../../custom/Picture";
import { Button, TextField } from "@mui/material";
import CustomSelect from "../../custom/CustomSelect";
import { useCategory } from "../../../hooks/useCategory";
import type { Category } from "../../../types/entities/categoryTypes";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiDelete } from "@mdi/js";

export default function SingleMediaDialog({
  open,
  setOpen,
  medias,
  handleEdit,
  handleDelete,
  submitting,
}: {
  open: string | false;
  setOpen: React.Dispatch<React.SetStateAction<string | false>>;
  medias: Media[] | undefined;
  handleEdit: (item: Partial<Media>) => void;
  handleDelete: (ids: string[]) => void;
  submitting: boolean;
}) {
  const [initialMedia, setInitialMedia] = useState<Media | null>(null);
  const [editingMedia, setEditingMedia] = useState<Partial<Media> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const { categories } = useCategory();

  useEffect(() => {
    if (open) {
      const media = medias?.find((m) => m.id === open) || null;
      setInitialMedia(media);
      setEditingMedia(media);
      setHasChanges(false);
    } else {
      setInitialMedia(null);
      setEditingMedia(null);
      setHasChanges(false);
    }
  }, [open, medias]);

  return (
    <CustomDialog
      key="mediaDialog"
      open={!!open}
      onClose={() => setOpen(false)}
      content={(() => {
        return (
          initialMedia && (
            <ResponsiveStack direction="row" columnGap={2}>
              <Picture image={initialMedia} maxHeight="calc(100dvh - 9rem)" />
              <ResponsiveStack rowGap={3}>
                <TextField
                  label="Label"
                  value={editingMedia?.label || ""}
                  onChange={(e) => {
                    setEditingMedia(
                      editingMedia
                        ? { ...editingMedia, label: e.target.value }
                        : null,
                    );
                    e.target.value !== (editingMedia?.label || "") &&
                      setHasChanges(true);
                  }}
                  required
                />
                <CustomSelect
                  label="Catégorie"
                  labelId="category-label"
                  value={
                    typeof editingMedia?.category === "string"
                      ? editingMedia.category
                      : editingMedia?.category?.id || ""
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

                    setEditingMedia(
                      editingMedia
                        ? { ...editingMedia, category: categoryValue as string }
                        : null,
                    );
                    categoryValue !==
                      (typeof initialMedia?.category === "string"
                        ? initialMedia.category
                        : initialMedia?.category?.id || "") &&
                      setHasChanges(true);
                  }}
                  options={
                    categories
                      ?.filter((c: Category) => c.entity === "media")
                      .map((c: Category) => ({
                        id: c.id,
                        label: c.depth
                          ? "__".repeat(c.depth) + ` ${c.label}`
                          : c.label,
                      })) || []
                  }
                />
                <Button
                  key="confirm"
                  color="success"
                  onClick={() => {
                    handleEdit(editingMedia!);
                  }}
                  disabled={submitting || !hasChanges || !editingMedia?.label}
                  startIcon={<Icon path={mdiCheck} size={1} />}
                  sx={{ width: "fit-content", minWidth: "208px" }}
                >
                  Modifier
                </Button>
                <Button
                  key="delete"
                  color="error"
                  onClick={() => {
                    handleDelete([initialMedia!.id]);
                  }}
                  disabled={submitting}
                  startIcon={<Icon path={mdiDelete} size={1} />}
                  sx={{ width: "fit-content", minWidth: "208px" }}
                >
                  Supprimer
                </Button>
              </ResponsiveStack>
            </ResponsiveStack>
          )
        );
      })()}
      width={12}
      closeButton
    />
  );
}
