import {
  Breadcrumbs,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
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
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";
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
import MediaCategorySidebar, {
  MEDIA_CATEGORY_DROP_PREFIX,
  MEDIA_FILTER_ALL,
  MEDIA_FILTER_UNCATEGORIZED,
  MEDIA_UNCATEGORIZED_DROP_ID,
} from "./MediaCategorySidebar";
import ResponsiveBodyTypography from "../../custom/ResponsiveBodyTypography";

function DraggableMediaCard({
  media,
  disabled,
  children,
  onClick,
  selected,
  showCheckbox,
}: {
  media: Media;
  disabled: boolean;
  children: React.ReactNode;
  onClick: () => void;
  selected: boolean;
  showCheckbox: boolean;
}) {
  const theme = useTheme();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `media-drag-${media.id}`,
      data: { mediaId: media.id },
      disabled,
    });

  return (
    <ResponsiveStack
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{
        position: "relative",
        aspectRatio: "1 / 1",
        border: `${selected ? "2px" : "1px"} solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
        borderRadius: 1,
        padding: "8px !important",
        cursor: disabled ? "default" : isDragging ? "grabbing" : "grab",
        justifyContent: "center",
        alignItems: "center",
        opacity: isDragging ? 0.6 : 1,
        transform: CSS.Transform.toString(transform),
        transition: "transform 120ms ease",
        touchAction: "none",
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      }}
      onClick={onClick}
    >
      {children}
      {showCheckbox && (
        <Checkbox
          checked={selected}
          sx={{
            position: "absolute",
            bottom: "-20px",
            right: "-20px",
          }}
        />
      )}
    </ResponsiveStack>
  );
}

export default function MediaGrid(
  props: MediaGridProps & {
    addMedias?: boolean;
    setAddMedias?: (open: boolean) => void;
    onAddMedia?: (file: File, category?: string) => void;
  },
) {
  const {
    mode,
    medias,
    handleEdit,
    onDelete,
    submitting,
    setAddMedias,
    onAddMedia,
  } = props;
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
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState<string>(MEDIA_FILTER_ALL);
  const [categoryOverrides, setCategoryOverrides] = useState<
    Record<string, string | undefined>
  >({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const mediaCategoryId = (media: Media) => {
    if (Object.prototype.hasOwnProperty.call(categoryOverrides, media.id)) {
      return categoryOverrides[media.id];
    }
    return extractId(media.category);
  };

  const filteredMedias = medias.filter((media) => {
    const categoryId = mediaCategoryId(media);
    if (selectedCategoryFilter === MEDIA_FILTER_ALL) return true;
    if (selectedCategoryFilter === MEDIA_FILTER_UNCATEGORIZED) {
      return !categoryId;
    }
    return categoryId === selectedCategoryFilter;
  });

  const allSelectedInFilter =
    filteredMedias.length > 0 &&
    filteredMedias.every((media) =>
      selectedMedias.some((selectedMedia) => selectedMedia.id === media.id),
    );

  const selectedInFilterCount = filteredMedias.filter((media) =>
    selectedMedias.some((selectedMedia) => selectedMedia.id === media.id),
  ).length;

  const categoryCounts = {
    all: medias.length,
    uncategorized: medias.filter((media) => !mediaCategoryId(media)).length,
    byCategoryId: medias.reduce<Record<string, number>>((acc, media) => {
      const categoryId = mediaCategoryId(media);
      if (categoryId) {
        acc[categoryId] = (acc[categoryId] || 0) + 1;
      }
      return acc;
    }, {}),
  };

  function handleCategoryDrop(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const mediaId = String(active.data.current?.mediaId || "");
    if (!mediaId) return;

    const overId = String(over.id);
    let nextCategoryId: string | undefined;

    if (overId === MEDIA_UNCATEGORIZED_DROP_ID) {
      nextCategoryId = "";
    } else if (overId.startsWith(MEDIA_CATEGORY_DROP_PREFIX)) {
      nextCategoryId = overId.replace(MEDIA_CATEGORY_DROP_PREFIX, "");
    } else {
      return;
    }

    // Si le média draggué fait partie de la sélection, appliquer à tous les sélectionnés
    // Sinon, ne l'appliquer qu'à ce média
    const draggedMedia = medias.find((media) => media.id === mediaId);
    if (!draggedMedia) return;

    // Déterminer la liste des médias à modifier
    const mediasToUpdate = selectedMedias.some((m) => m.id === mediaId)
      ? selectedMedias
      : [draggedMedia];

    // Vérifier si au moins un média doit changer de catégorie
    const needUpdate = mediasToUpdate.some(
      (media) => (mediaCategoryId(media) || "") !== (nextCategoryId || ""),
    );
    if (!needUpdate) return;

    // Mettre à jour les overrides et les états locaux
    setCategoryOverrides((prev) => {
      const updated = { ...prev };
      mediasToUpdate.forEach((media) => {
        updated[media.id] = nextCategoryId;
      });
      return updated;
    });
    setSelectedMedias((prev) =>
      prev.map((media) =>
        mediasToUpdate.some((m) => m.id === media.id)
          ? { ...media, category: nextCategoryId }
          : media,
      ),
    );
    setEditingMedias((prev) =>
      prev.map((media) =>
        mediasToUpdate.some((m) => m.id === media.id)
          ? { ...media, category: nextCategoryId }
          : media,
      ),
    );

    // Appliquer la mutation à tous les médias concernés
    mediasToUpdate.forEach((media) => {
      handleEdit({
        variables: {
          id: media.id,
          input: { category: nextCategoryId },
        },
      });
    });
  }

  useEffect(() => {
    setCategoryOverrides({});
  }, [medias]);

  useEffect(() => {
    setSelectedMedias([]);
    setEditingMedias([]);
  }, [selectedCategoryFilter]);

  const selectedMedia =
    mode === "picker"
      ? medias.find((m) => m.id === selectedMedias[0]?.id)
      : undefined;

  // Ouvre la zone d'importation si aucun média pour le filtre
  useEffect(() => {
    if (filteredMedias.length === 0) {
      setShowAddZone(true);
    }
  }, [filteredMedias.length]);

  const categoryRefs = useRef<Record<string, HTMLLIElement | null>>({});
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  return (
    <>
      {/* Conteneur principal */}
      <DndContext sensors={sensors} onDragEnd={handleCategoryDrop}>
        <ResponsiveStack
          maxWidth="100%"
          sx={{
            flex: "1 1 auto",
            flexDirection: "row",
            overflow: "hidden",
            width: "100%",
            marginRight: mode === "library" ? -4 : undefined,
            paddingRight: mode === "picker" ? "24px !important" : 4,
            boxSizing: "content-box",
            maxHeight: mode === "picker" ? "100%" : undefined,
          }}
        >
          {/* Sidebar des catégories */}
          <MediaCategorySidebar
            categories={categories}
            selectedFilter={selectedCategoryFilter}
            onSelectFilter={setSelectedCategoryFilter}
            counts={categoryCounts}
            openCategories={openCategories}
            setOpenCategories={setOpenCategories}
            categoryRefs={categoryRefs}
          />

          {/* Conteneur de médias */}
          <ResponsiveStack
            rowGap={3}
            maxWidth="100%"
            sx={{
              overflowY: mode === "library" ? "auto" : "hidden",
              overflowX: "hidden",
              maxHeight: mode === "picker" ? "100%" : undefined,
              paddingLeft: 2,
              marginRight: mode === "library" ? -4 : undefined,
              paddingRight: mode === "library" ? 4 : "24px",
              width: "100%",
              minWidth: 0,
              minHeight: 0,
              boxSizing: mode === "library" ? "content-box" : "border-box",
            }}
          >
            {/* Fil d'ariane des catégories */}
            {selectedCategoryFilter !== MEDIA_FILTER_ALL &&
              selectedCategoryFilter !== MEDIA_FILTER_UNCATEGORIZED && (
                <Breadcrumbs separator="|">
                  <Link
                    onClick={() => setSelectedCategoryFilter(MEDIA_FILTER_ALL)}
                    color="primary"
                    sx={{ cursor: "pointer", textTransform: "uppercase" }}
                    underline="hover"
                  >
                    Tous
                  </Link>
                  {(() => {
                    // Construit la liste des catégories ascendantes
                    const breadcrumbs = [];
                    let current = categories?.find(
                      (c: any) => c.id === selectedCategoryFilter,
                    );
                    while (current) {
                      breadcrumbs.unshift(current);
                      current = current.parent
                        ? categories?.find(
                            (c: any) => c.id === extractId(current?.parent),
                          )
                        : undefined;
                    }
                    return breadcrumbs.map((cat, idx) => (
                      <Link
                        component={
                          idx === breadcrumbs.length - 1 ? "h2" : "span"
                        }
                        key={cat.id}
                        color={
                          idx === breadcrumbs.length - 1
                            ? theme.palette.text.primary
                            : "inherit"
                        }
                        onClick={() => {
                          // Ouvre tous les ascendants et la catégorie cliquée
                          const path = [];
                          let node: Category | undefined = cat;
                          while (node) {
                            path.unshift(node.id);
                            node = node.parent
                              ? categories?.find(
                                  (c) => c.id === extractId(node?.parent),
                                )
                              : undefined;
                          }
                          setOpenCategories(path);
                          setSelectedCategoryFilter(cat.id);
                          setTimeout(() => {
                            const ref = categoryRefs.current[cat.id];
                            if (ref)
                              ref.scrollIntoView({
                                behavior: "smooth",
                                block: "center",
                              });
                          }, 500);
                        }}
                        sx={{
                          cursor:
                            idx === breadcrumbs.length - 1
                              ? "default"
                              : "pointer",
                          // fontWeight:
                          //   idx === breadcrumbs.length - 1 ? "700" : "400",
                          textTransform: "uppercase",
                        }}
                        underline={
                          idx === breadcrumbs.length - 1 ? "none" : "hover"
                        }
                      >
                        {cat.label}
                      </Link>
                    ));
                  })()}
                </Breadcrumbs>
              )}

            {/* Titre pour toutes les catégories et aucune catégorie */}
            {(selectedCategoryFilter === MEDIA_FILTER_ALL ||
              selectedCategoryFilter === MEDIA_FILTER_UNCATEGORIZED) && (
              <ResponsiveBodyTypography
                variant="bodySm"
                component="h2"
                style={{ textTransform: "uppercase", fontWeight: 400 }}
              >
                {selectedCategoryFilter === MEDIA_FILTER_ALL
                  ? "Tous les médias"
                  : "Médias non catégorisés"}
              </ResponsiveBodyTypography>
            )}

            {/* Zone de dépôt de médias */}
            {showAddZone && (
              <MediaDropZone
                handleAdd={(options) => {
                  // Ajoute la catégorie sélectionnée si un filtre est actif (hors "tous" et "non catégorisé")
                  let category = undefined;
                  if (
                    selectedCategoryFilter !== MEDIA_FILTER_ALL &&
                    selectedCategoryFilter !== MEDIA_FILTER_UNCATEGORIZED
                  ) {
                    category = selectedCategoryFilter;
                  }
                  // Si la catégorie est définie, l'ajouter à l'input
                  if (mode === "picker" && handleAdd) {
                    const input = category
                      ? { ...options.variables.input, category }
                      : options.variables.input;
                    handleAdd({ variables: { input } });
                  } else if (mode === "library" && onAddMedia && setAddMedias) {
                    onAddMedia(options.variables.input.file, category);
                    setAddMedias(false);
                  }
                }}
                submitting={addMediaLoading || false}
              />
            )}

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
                      checked={allSelectedInFilter}
                      indeterminate={
                        selectedInFilterCount > 0 && !allSelectedInFilter
                      }
                      onChange={(e) =>
                        setSelectedMedias(
                          e.target.checked ? [...filteredMedias] : [],
                        )
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
              <Button
                startIcon={
                  <Icon path={showAddZone ? mdiClose : mdiPlus} size={1} />
                }
                onClick={() => setShowAddZone((prev) => !prev)}
                // sx={{ marginLeft: "auto" }}
              >
                {showAddZone
                  ? "Masquer la zone d'importation"
                  : "Importer des médias"}
              </Button>
            </ResponsiveStack>

            {/* Grille de médias */}
            <ResponsiveBox
              rowGap={3}
              sx={{
                columnGap: 4,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(9rem, 1fr))",
                overflowY: "auto",
                overflowX: "hidden",
                paddingBottom: "24px !important",
                marginRight: mode === "library" ? -4 : undefined,
                paddingRight: mode === "picker" ? "24px !important" : 4,
                width: mode === "library" ? "100%" : "calc(100% + 24px)",
                flex: "1 1 auto",
              }}
            >
              {filteredMedias.map((media) => {
                return (
                  /* Conteneur de chaque média */
                  <DraggableMediaCard
                    key={`${media.id}-container`}
                    media={media}
                    disabled={submitting}
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
                    selected={selectedMedias.some((m) => m.id === media.id)}
                    showCheckbox={select}
                  >
                    {/* Image */}
                    <Picture image={media} />
                  </DraggableMediaCard>
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
                            medias.find(
                              (media) => media.id === selectedMedia.id,
                            ),
                          )
                          .filter(
                            (media): media is Media => media !== undefined,
                          ),
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
                        sx={{
                          flex: "0 1 auto",
                          overflowY: "auto",
                          overflowX: "hidden",
                          width: "100%",
                        }}
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
                          <span>
                            {selectedMedias.length} médias sélectionnés
                          </span>
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
      </DndContext>

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
