import { useState } from "react";
import CustomDialog from "../../custom/CustomDialog";
import type { Media } from "../../../types/entities/mediaTypes";
import Picture from "../../custom/Picture";
import { Button, TextField, useTheme } from "@mui/material";
import CustomSelect from "../../custom/CustomSelect";
import type { Category } from "../../../types/entities/categoryTypes";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiDelete } from "@mdi/js";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import useCategories from "../../../hooks/queries/useCategories";
import { extractId, getSelectValue } from "../../../utils/normalizeRef";
import { ImageFocusField } from "../../custom/ImageFocusField";
import useFormDialog from "../../../hooks/useFormDialog";

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
  handleEdit: (options: {
    variables: { id: string; input: Partial<Media> };
  }) => unknown;
  handleDelete: (options: { variables: { id: string } }) => unknown;
  submitting: boolean;
}) {
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const {
    initialItem: initialMedia,
    editingItem: editingMedia,
    setEditingItem: setEditingMedia,
    hasChanges,
    setHasChanges,
  } = useFormDialog<Media>({
    open,
    items: medias,
    defaults: {},
  });

  const { categories } = useCategories();

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
                sx={{
                  flexDirection: "row",
                  columnGap: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
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
                  sx={{
                    flex: "0 0 336px",
                    height: "100%",
                    justifyContent: "space-between",
                    borderLeft: `1px solid ${theme.palette.divider}`,
                    alignItems: "start",
                    paddingLeft: 2,
                    maxHeight: "100%",
                    overflow: "hidden",
                  }}
                >
                  <ResponsiveStack
                    rowGap={3}
                    sx={{
                      flex: "0 1 auto",
                      overflowY: "auto",
                      overflowX: "hidden",
                      width: "100%",
                    }}
                  >
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
                      value={extractId(editingMedia?.category) ?? ""}
                      onChange={(e) => {
                        const value = getSelectValue(e);
                        setEditingMedia(
                          editingMedia
                            ? { ...editingMedia, category: value }
                            : null,
                        );
                        value !== (extractId(initialMedia?.category) ?? "") &&
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
                    <ImageFocusField
                      image={initialMedia}
                      value={editingMedia?.focus}
                      onChange={(focus) => {
                        setEditingMedia(
                          editingMedia ? { ...editingMedia, focus } : null,
                        );
                        focus !== (initialMedia?.focus ?? "") &&
                          setHasChanges(true);
                      }}
                    />
                  </ResponsiveStack>

                  <ResponsiveStack sx={{ width: "100%" }}>
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
                                category: extractId(editingMedia!.category),
                                focus: editingMedia!.focus,
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
                      sx={{ width: "100%", minWidth: "208px" }}
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
                      sx={{ width: "100%", minWidth: "208px" }}
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
