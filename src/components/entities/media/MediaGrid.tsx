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
import { useEffect, useState } from "react";
import type { Media, MediaGridProps } from "../../../types/entities/mediaTypes";
import Picture from "../../custom/Picture";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import CustomSelect from "../../custom/CustomSelect";
import type { Category } from "../../../types/entities/categoryTypes";
import useCategories from "../../../hooks/queries/useCategories";
import MediaDropZone from "./MediaDropZone";

export default function MediaGrid(props: MediaGridProps) {
  const { mode, medias, onDelete, submitting } = props;
  const setOpenDialog = mode === "library" ? props.setOpenDialog : undefined;
  const multiple = mode === "picker" ? props.multiple : false;
  const handleEdit = mode === "picker" ? props.handleEdit : undefined;
  const images = mode === "picker" ? props.images : undefined;
  const setImages = mode === "picker" ? props.setImages : undefined;
  const handleAdd = mode === "picker" ? props.handleAdd : undefined;
  const addMediaLoading = mode === "picker" ? props.addMediaLoading : undefined;

  const theme = useTheme();

  const [select, setSelect] = useState<boolean>(
    mode === "library" ? false : true,
  );
  const [selectedMedias, setSelectedMedias] = useState<Media[]>(images || []);

  useEffect(() => {
    if (mode === "picker" && images) {
      console.log("Selected medias updated:", images);
      setSelectedMedias(images);
    }
  }, [images]);

  useEffect(() => {
    console.log("Selected medias changed:", selectedMedias);
  }, [selectedMedias]);

  const [editingMedia, setEditingMedia] = useState<Partial<Media> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const { categories } = useCategories();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [showAddZone, setShowAddZone] = useState(false);

  const paths: { [key: string]: string } = {
    xl: "",
    l: "",
    m: "",
    s: "",
    xs: "",
  };

  return (
    <>
      {/* Conteneur principal */}
      <ResponsiveStack
        direction="row"
        sx={{
          height: "100%",
          maxHeight: "100%",
          overflow: "hidden",
          paddingX: mode === "library" ? "32px !important" : undefined,
          marginX: mode === "library" ? "-32px !important" : undefined,
          width: mode === "library" ? "calc(100% + 64px)" : "100%",
        }}
        maxWidth={mode === "library" ? "calc(100% + 64px) !important" : "100%"}
      >
        {/* Conteneur de médias */}
        <ResponsiveStack
          rowGap={3}
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            height: mode === "library" ? "100%" : undefined,
            paddingX: mode === "library" ? "32px !important" : undefined,
            marginX: mode === "library" ? "-32px !important" : undefined,
            width: mode === "library" ? "calc(100% + 64px)" : undefined,
            flex: "1 1 0",
            minWidth: 0,
            minHeight: 0,
          }}
          maxWidth={
            mode === "library" ? "calc(100% + 64px) !important" : "100%"
          }
        >
          {(mode === "library" || multiple) && (
            /* Barre d'actions */
            <ResponsiveStack
              direction="row"
              rowGap={3}
              columnGap={2}
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              flexWrap="wrap-reverse"
              maxWidth="100% !important"
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
                      path={
                        select ? mdiClose : mdiCheckboxMultipleMarkedOutline
                      }
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
          )}

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
            columnGap={4}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(6rem, 1fr))",
              overflowY: mode === "library" ? "auto" : undefined,
              overflowX: mode === "library" ? "hidden" : undefined,
              paddingX: mode === "library" ? "32px !important" : undefined,
              paddingRight: mode === "picker" ? "20px !important" : undefined,
              marginX: mode === "library" ? "-32px !important" : undefined,
              width: mode === "library" ? "calc(100% + 64px)" : undefined,
            }}
            maxWidth={
              mode === "library" ? "calc(100% + 64px) !important" : undefined
            }
          >
            {medias.map((media) => {
              for (const key in paths) {
                if (media.type === "webp") {
                  paths[key] = media.path.replace(/\.webp$/, `_${key}.webp`);
                }
              }
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
                      if (selectedMedias.some((m) => m.id === media.id)) {
                        setSelectedMedias((prev) =>
                          prev.filter((m) => m.id !== media.id),
                        );
                        setEditingMedia(null);
                      } else {
                        mode === "library" || multiple
                          ? setSelectedMedias((prev) => [...prev, media])
                          : setSelectedMedias([media]);
                        setEditingMedia(media);
                      }
                    } else if (setOpenDialog) {
                      setOpenDialog(media.id);
                    }
                  }}
                >
                  {/* Image */}
                  <Picture image={media} />

                  {select && (
                    /* Checkbox de sélection */
                    <Checkbox
                      checked={selectedMedias.some((m) => m.id === media.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          mode === "library" || multiple
                            ? setSelectedMedias((prev) => [...prev, media])
                            : setSelectedMedias([media]);
                        } else {
                          setSelectedMedias((prev) =>
                            prev.filter((m) => m.id !== media.id),
                          );
                        }
                      }}
                      sx={{
                        position: "absolute",
                        bottom: "-20px",
                        right: "-20px",
                        // backgroundColor: "background.paper",
                      }}
                    />
                  )}
                </ResponsiveStack>
              );
            })}
          </ResponsiveBox>

          {/* Barre d'actions pour les éléments sélectionnés */}
          {selectedMedias && mode === "library" && (
            <ResponsiveStack
              direction="row"
              rowGap={3}
              columnGap={2}
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              flexWrap="wrap-reverse"
            >
              {/* Nombre de médias sélectionnés */}
              <span>
                {selectedMedias.length} média
                {selectedMedias.length > 1 ? "s" : ""} sélectionné
                {selectedMedias.length > 1 ? "s" : ""}
              </span>

              {/* Bouton de suppression */}
              <Button
                color="error"
                startIcon={<Icon path={mdiDelete} size={1} />}
                sx={{ marginLeft: "auto" }}
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
            const selectedMedia = medias.find(
              (m) => m.id === selectedMedias[0]?.id,
            );
            return (
              <ResponsiveStack
                rowGap={3}
                justifyContent="space-between"
                sx={{
                  flex: "0 0 240px",
                  borderLeft: `1px solid ${theme.palette.divider}`,
                  alignItems: "start",
                  paddingLeft: 2,
                  maxHeight: "100%",
                  overflow: "auto",
                }}
              >
                {selectedMedia && (
                  <>
                    <ResponsiveStack rowGap={3}>
                      {selectedMedias.length === 1 ? (
                        <>
                          <Picture
                            image={selectedMedia}
                            maxHeight="fit-content"
                          />
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
                        </>
                      ) : (
                        <span>{selectedMedias.length} médias sélectionnés</span>
                      )}
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
                            (typeof selectedMedia?.category === "string"
                              ? selectedMedia.category
                              : selectedMedia?.category?.id || "") &&
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
                        key="select"
                        color="primary"
                        onClick={() =>
                          setImages ? setImages(selectedMedias) : undefined
                        }
                        disabled={submitting}
                        startIcon={<Icon path={mdiCheck} size={1} />}
                        sx={{ width: "fit-content", minWidth: "208px" }}
                      >
                        Sélectionner
                      </Button>
                      <Button
                        key="edit"
                        color="success"
                        onClick={async () => {
                          if (editingMedia && editingMedia.id) {
                            await handleEdit?.({
                              variables: {
                                id: editingMedia!.id,
                                input: {
                                  label: editingMedia!.label,
                                  category:
                                    typeof editingMedia!.category === "string"
                                      ? editingMedia!.category
                                      : editingMedia!.category?.id || "",
                                },
                              },
                            });
                          }
                        }}
                        disabled={
                          submitting || !hasChanges || !editingMedia?.label
                        }
                        startIcon={<Icon path={mdiPencil} size={1} />}
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
                  </>
                )}
              </ResponsiveStack>
            );
          })()}
      </ResponsiveStack>

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
