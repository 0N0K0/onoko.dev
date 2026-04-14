import { useEffect, useState } from "react";
import CustomDialog from "../../custom/CustomDialog";
import type { Media } from "../../../types/entities/mediaTypes";
import Picture from "../../custom/Picture";
import { Button, TextField } from "@mui/material";
import CustomSelect from "../../custom/CustomSelect";
import type { Category } from "../../../types/entities/categoryTypes";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiDelete } from "@mdi/js";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import useCategories from "../../../hooks/queries/useCategories";
import type { useMutation } from "@apollo/client/react";
import type { ApolloCache } from "@apollo/client";

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
  handleEdit: useMutation.MutationFunction<
    boolean,
    { id: string; input: Partial<Media> },
    ApolloCache
  >;
  handleDelete: useMutation.MutationFunction<
    boolean,
    { id: string },
    ApolloCache
  >;
  submitting: boolean;
}) {
  const [initialMedia, setInitialMedia] = useState<Media | null>(null);
  const [editingMedia, setEditingMedia] = useState<Partial<Media> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { categories } = useCategories();

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
    <>
      <CustomDialog
        key="mediaDialog"
        open={!!open}
        onClose={() => setOpen(false)}
        content={(() => {
          return (
            initialMedia && (
              <ResponsiveStack
                direction="row"
                columnGap={2}
                justifyContent="space-between"
                alignItems="center"
                width="100%"
                height="100%"
                overflow="hidden"
              >
                <Picture
                  image={initialMedia}
                  maxHeight="calc(100dvh - 9rem)"
                  style={{
                    margin: "auto",
                    flex: "1 1 0",
                    minWidth: 0,
                    maxWidth:
                      initialMedia.type === "webp" ? "fit-content" : undefined,
                  }}
                />
                <ResponsiveStack
                  rowGap={3}
                  sx={{ flex: "0 1 0" }}
                  height="100%"
                  justifyContent="space-between"
                >
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
                            ? {
                                ...editingMedia,
                                category: categoryValue as string,
                              }
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
                  </ResponsiveStack>

                  <ResponsiveStack>
                    <Button
                      key="confirm"
                      color="success"
                      onClick={() => {
                        if (editingMedia && editingMedia.id) {
                          handleEdit({
                            variables: {
                              id: editingMedia!.id,
                              input: {
                                label: editingMedia!.label,
                                category: editingMedia!.category,
                              },
                            },
                          });
                        }
                        setOpen(false);
                      }}
                      disabled={
                        submitting || !hasChanges || !editingMedia?.label
                      }
                      startIcon={<Icon path={mdiCheck} size={1} />}
                      sx={{ width: "fit-content", minWidth: "208px" }}
                    >
                      Modifier
                    </Button>
                    <Button
                      key="delete"
                      color="error"
                      onClick={() => {
                        setDeleteDialogOpen(true);
                      }}
                      disabled={submitting}
                      startIcon={<Icon path={mdiDelete} size={1} />}
                      sx={{ width: "fit-content", minWidth: "208px" }}
                    >
                      Supprimer
                    </Button>
                  </ResponsiveStack>
                </ResponsiveStack>
              </ResponsiveStack>
            )
          );
        })()}
        width={12}
        height="100%"
        closeButton
      />
      <DeleteConfirmationDialog
        label="ce média"
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onClickDelete={() => {
          handleDelete({ variables: { id: initialMedia!.id } });
          setDeleteDialogOpen(false);
          setOpen(false);
        }}
        submitting={submitting}
      />
    </>
  );
}
