import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  useTheme,
} from "@mui/material";
import { ResponsiveBox, ResponsiveStack } from "../../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import {
  mdiCheck,
  mdiCheckboxMultipleMarkedOutline,
  mdiClose,
  mdiDelete,
  mdiPencil,
  mdiPlus,
} from "@mdi/js";
import { useState } from "react";
import type { Media, MediaGridProps } from "../../../types/entities/mediaTypes";
import Picture from "../../custom/Picture";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import CustomSelect from "../../custom/CustomSelect";
import type { Category } from "../../../types/entities/categoryTypes";
import useCategories from "../../../hooks/queries/useCategories";
import MediaDropZone from "./MediaDropZone";
import BulkEditFormDialog from "../BulkEditFormDialog";
import { extractId, getSelectValue } from "../../../utils/normalizeRef";
import { ImageFocusField } from "../../custom/ImageFocusField";

export default function MediaGrid(props: MediaGridProps) {
  const { mode, medias, handleEdit, onDelete, submitting } = props;
  const setOpenDialog = mode === "library" ? props.setOpenDialog : undefined;
  const multiple = mode === "picker" ? props.multiple : false;
  const images = mode === "picker" ? props.images : undefined;
  const setImages = mode === "picker" ? props.setImages : undefined;
  const handleAdd = mode === "picker" ? props.handleAdd : undefined;
  const addMediaLoading = mode === "picker" ? props.addMediaLoading : undefined;

  const theme = useTheme();

  const [select, setSelect] = useState<boolean>(
    mode === "library" ? false : true,
  );
  const [selectedMedias, setSelectedMedias] = useState<Media[]>(images || []);

  const [showAddZone, setShowAddZone] = useState(false);

  const [bulkEditDialogOpen, setBulkEditDialogOpen] = useState(false);

  const [editingMedias, setEditingMedias] = useState<Media[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  const { categories } = useCategories();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const selectedMedia =
    mode === "picker"
      ? medias.find((m) => m.id === selectedMedias[0]?.id)
      : undefined;

  return (
    <>
      {/* Conteneur principal */}
      <ResponsiveStack
        maxWidth={mode === "library" ? "calc(100% + 64px) !important" : "100%"}
        sx={{
          flexDirection: "row",
          height: "100%",
          maxHeight: "100%",
          overflow: "hidden",
          paddingX: mode === "library" ? "32px !important" : undefined,
          marginX: mode === "library" ? "-32px !important" : undefined,
          width: mode === "library" ? "calc(100% + 64px)" : "100%",
        }}
      >
        {/* Conteneur de médias */}
        <ResponsiveStack
          rowGap={3}
          maxWidth={
            mode === "library" ? "calc(100% + 64px) !important" : "100%"
          }
          sx={{
            overflowY: mode === "library" ? "auto" : "hidden",
            overflowX: "hidden",
            maxHeight: mode === "picker" ? "100%" : undefined,
            paddingX: mode === "library" ? "32px !important" : undefined,
            paddingRight: mode === "picker" ? "24px !important" : undefined,
            marginX: mode === "library" ? "-32px !important" : undefined,
            width: mode === "library" ? "calc(100% + 64px)" : undefined,
            flex: "1 1 0",
            minWidth: 0,
            minHeight: 0,
          }}
        >
          {/* Barre d'actions */}
          <ResponsiveStack
            rowGap={3}
            maxWidth="100% !important"
            sx={{
              flexDirection: "row",
              columnGap: 2,
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap-reverse",
            }}
          >
            {select && (mode === "library" || multiple) && (
              /* Bouton de sélection multiple */
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedMedias.length === medias.length}
                    indeterminate={
                      selectedMedias.length > 0 &&
                      selectedMedias.length < medias.length
                    }
                    onChange={(e) =>
                      setSelectedMedias(e.target.checked ? [...medias] : [])
                    }
                  />
                }
                label="Sélectionner tout"
              />
            )}

            {/* Bouton pour activer/désactiver le mode de sélection */}
            {mode === "library" && (
              <Button
                startIcon={
                  <Icon
                    path={select ? mdiClose : mdiCheckboxMultipleMarkedOutline}
                    size={1}
                  />
                }
                variant="outlined"
                onClick={() => {
                  setSelect((prev) => !prev);
                  setSelectedMedias([]);
                }}
                sx={{ marginLeft: "auto" }}
              >
                Sélection multiple
              </Button>
            )}

            {/* Bouton pour afficher la zone d'ajout de média */}
            {mode === "picker" && (
              <Button
                startIcon={
                  <Icon path={showAddZone ? mdiClose : mdiPlus} size={1} />
                }
                onClick={() => setShowAddZone((prev) => !prev)}
                sx={{ marginLeft: "auto" }}
              >
                {showAddZone
                  ? "Masquer la zone d'importation"
                  : "Importer des médias"}
              </Button>
            )}
          </ResponsiveStack>

          {/* Zone de dépôt de médias */}
          {showAddZone && handleAdd && (
            <MediaDropZone
              handleAdd={handleAdd}
              submitting={addMediaLoading || false}
            />
          )}

          {/* Grille de médias */}
          <ResponsiveBox
            rowGap={3}
            maxWidth={
              mode === "library" ? "calc(100% + 64px) !important" : undefined
            }
            sx={{
              columnGap: 4,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(6rem, 1fr))",
              overflowY: "auto",
              overflowX: "hidden",
              paddingX: mode === "library" ? "32px !important" : undefined,
              paddingRight: mode === "picker" ? "24px !important" : undefined,
              paddingBottom: "20px !important",
              marginX: mode === "library" ? "-32px !important" : undefined,
              width:
                mode === "library" ? "calc(100% + 64px)" : "calc(100% + 24px)",
            }}
          >
            {medias.map((media) => {
              return (
                /* Conteneur de chaque média */
                <ResponsiveStack
                  key={`${media.id}-container`}
                  sx={{
                    position: "relative",
                    aspectRatio: "1 / 1",
                    border: `${select && selectedMedias.some((m) => m.id === media.id) ? "2px" : "1px"} solid ${select && selectedMedias.some((m) => m.id === media.id) ? theme.palette.primary.main : theme.palette.divider}`,
                    borderRadius: 1,
                    padding: "8px !important",
                    cursor: "pointer",
                    justifyContent: "center",
                    alignItems: "center",
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                  onClick={() => {
                    if (select) {
                      if (!multiple && mode === "picker") {
                        setSelectedMedias([media]);
                        setEditingMedias([media]);
                        setHasChanges(false);
                      } else if (
                        selectedMedias.some((m) => m.id === media.id)
                      ) {
                        setSelectedMedias((prev) =>
                          prev.filter((m) => m.id !== media.id),
                        );
                        setEditingMedias((prev) =>
                          prev.filter((m) => m.id !== media.id),
                        );
                      } else {
                        setSelectedMedias((prev) => [...prev, media]);
                        setEditingMedias((prev) => [...prev, media]);
                      }
                    } else if (setOpenDialog) {
                      setOpenDialog(media.id);
                    }
                  }}
                >
                  {/* Image */}
                  <Picture image={media} />

                  {/* Checkbox de sélection */}
                  {select && (
                    <Checkbox
                      checked={selectedMedias.some((m) => m.id === media.id)}
                      sx={{
                        position: "absolute",
                        bottom: "-20px",
                        right: "-20px",
                      }}
                    />
                  )}
                </ResponsiveStack>
              );
            })}
          </ResponsiveBox>

          {/* Barre d'actions pour les éléments sélectionnés */}
          {selectedMedias.length > 0 && mode === "library" && (
            <ResponsiveStack
              rowGap={3}
              sx={{
                flexDirection: "row",
                columnGap: 2,
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                flexWrap: "wrap-reverse",
              }}
            >
              {/* Nombre de médias sélectionnés */}
              <span>
                {selectedMedias.length} média
                {selectedMedias.length > 1 ? "s" : ""} sélectionné
                {selectedMedias.length > 1 ? "s" : ""}
              </span>

              {/* Bouton de modification */}
              <Button
                startIcon={<Icon path={mdiPencil} size={1} />}
                onClick={() => {
                  if (selectedMedias.length === 1) {
                    setOpenDialog?.(selectedMedias[0].id);
                  } else {
                    setEditingMedias(
                      selectedMedias
                        .map((selectedMedia) =>
                          medias.find((media) => media.id === selectedMedia.id),
                        )
                        .filter((media): media is Media => media !== undefined),
                    );
                    setBulkEditDialogOpen(true);
                  }
                }}
                disabled={submitting}
                sx={{ marginLeft: "auto" }}
              >
                Modifier
              </Button>

              {/* Bouton de suppression */}
              <Button
                color="error"
                startIcon={<Icon path={mdiDelete} size={1} />}
                onClick={() => setDeleteDialogOpen(true)}
                disabled={submitting}
              >
                Supprimer
              </Button>
            </ResponsiveStack>
          )}
        </ResponsiveStack>

        {/* Edition des médias sélectionnés en mode picker */}
        {mode === "picker" &&
          (() => {
            return (
              <ResponsiveStack
                rowGap={3}
                sx={{
                  justifyContent: "space-between",
                  flex: "0 0 336px",
                  borderLeft: `1px solid ${theme.palette.divider}`,
                  alignItems: "start",
                  paddingLeft: 2,
                  maxHeight: "100%",
                  overflow: "hidden",
                }}
              >
                {selectedMedia && (
                  <>
                    <ResponsiveStack
                      rowGap={3}
                      sx={{ flex: "0 1 auto", overflowY: "auto" }}
                    >
                      {selectedMedias.length === 1 ? (
                        <>
                          <TextField
                            label="Label"
                            value={editingMedias[0]?.label || ""}
                            onChange={(e) => {
                              setEditingMedias(
                                editingMedias.length > 0
                                  ? [
                                      {
                                        ...editingMedias[0],
                                        label: e.target.value,
                                      },
                                    ]
                                  : [],
                              );
                              e.target.value !==
                                (editingMedias[0]?.label || "") &&
                                setHasChanges(true);
                            }}
                            required
                          />
                        </>
                      ) : (
                        <span>{selectedMedias.length} médias sélectionnés</span>
                      )}
                      <CustomSelect
                        label="Catégorie"
                        labelId="category-label"
                        value={(() => {
                          if (editingMedias.length === 0) return "";
                          const first =
                            extractId(editingMedias[0].category) ?? "";
                          return editingMedias.every(
                            (m) => (extractId(m.category) ?? "") === first,
                          )
                            ? first
                            : "";
                        })()}
                        onChange={(e) => {
                          const value = getSelectValue(e);
                          setEditingMedias(
                            editingMedias.map((m) => ({
                              ...m,
                              category: value,
                            })),
                          );
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
                      {selectedMedias.length === 1 && (
                        <ImageFocusField
                          image={selectedMedia}
                          value={editingMedias[0]?.focus}
                          onChange={(focus) => {
                            setEditingMedias(
                              editingMedias.length > 0
                                ? [{ ...editingMedias[0], focus }]
                                : [],
                            );
                            setHasChanges(true);
                          }}
                        />
                      )}
                    </ResponsiveStack>
                    <ResponsiveStack sx={{ width: "100%" }}>
                      <Button
                        key="select"
                        color="primary"
                        onClick={() =>
                          setImages ? setImages(selectedMedias) : undefined
                        }
                        disabled={submitting}
                        startIcon={<Icon path={mdiCheck} size={1} />}
                        sx={{ width: "100%", minWidth: "208px" }}
                      >
                        Sélectionner
                      </Button>
                      <Button
                        key="edit"
                        color="success"
                        onClick={async () => {
                          if (selectedMedias.length > 1) {
                            for (const media of editingMedias) {
                              if (media.id) {
                                await handleEdit?.({
                                  variables: {
                                    id: media.id,
                                    input: {
                                      category: extractId(media.category),
                                    },
                                  },
                                });
                              }
                            }
                          } else if (
                            editingMedias.length > 0 &&
                            editingMedias[0].id
                          ) {
                            await handleEdit?.({
                              variables: {
                                id: editingMedias[0].id,
                                input: {
                                  label: editingMedias[0].label,
                                  category: extractId(
                                    editingMedias[0].category,
                                  ),
                                  focus: editingMedias[0].focus,
                                },
                              },
                            });
                          }
                        }}
                        disabled={
                          submitting ||
                          !hasChanges ||
                          (selectedMedias.length === 1 &&
                            !editingMedias[0]?.label)
                        }
                        startIcon={<Icon path={mdiPencil} size={1} />}
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
                  </>
                )}
              </ResponsiveStack>
            );
          })()}
      </ResponsiveStack>

      {/* Dialogue de modification des médias sélectionnés en mode librairie */}
      {mode === "library" && bulkEditDialogOpen && (
        <BulkEditFormDialog
          open={bulkEditDialogOpen}
          setOpen={() => setBulkEditDialogOpen(false)}
          title="Modifier les médias sélectionnés"
          content={
            <CustomSelect
              label="Catégorie"
              labelId="category-label"
              value={extractId(editingMedias[0]?.category) ?? ""}
              onChange={(e) => {
                const value = getSelectValue(e);
                setEditingMedias((prev) =>
                  prev.map((m) => ({ ...m, category: value })),
                );
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
          }
          onClick={() => {
            for (const media of editingMedias) {
              if (media.id) {
                handleEdit({
                  variables: {
                    id: media.id,
                    input: { category: extractId(media.category) },
                  },
                });
              }
            }
          }}
          disabled={submitting}
        />
      )}

      {/* Dialogue de confirmation de suppression */}
      <DeleteConfirmationDialog
        label="ce média"
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onClickDelete={() => {
          for (const media of selectedMedias) {
            onDelete({ variables: { id: media.id } });
          }
          setSelectedMedias([]);
        }}
        submitting={submitting}
      />
    </>
  );
}
