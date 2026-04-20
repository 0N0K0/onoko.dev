import {
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SnackbarAlert from "../../custom/SnackbarAlert";
import MediaDropZone from "./MediaDropZone";
import ResponsiveTitle from "../../custom/ResponsiveTitle";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiPlus, mdiViewGrid, mdiViewList } from "@mdi/js";
import MediaGrid from "./MediaGrid";
import CustomTable from "../../custom/CustomTable";
import Picture from "../../custom/Picture";
import SingleMediaDialog from "./SingleMediaDialog";
import CustomSelect from "../../custom/CustomSelect";
import type { Media } from "../../../types/entities/mediaTypes";
import type { Category } from "../../../types/entities/categoryTypes";
import useMedias from "../../../hooks/queries/useMedias";
import useCategories from "../../../hooks/queries/useCategories";
import type { useMutation } from "@apollo/client/react";
import type { ApolloCache } from "@apollo/client";

/**
 * Composant de gestion de la bibliothèque de médias.
 * Ce composant affiche une liste de médias importés, avec la possibilité de les visualiser en grille ou en liste, ainsi que d'ajouter de nouveaux médias via un système de glisser-déposer.
 * Il utilise des hooks personnalisés pour récupérer les médias et les catégories disponibles, ainsi que pour effectuer les mutations nécessaires à l'ajout, la modification et la suppression des médias.
 * Le composant gère également l'affichage de dialogues pour visualiser un média en détail ou pour modifier les catégories des médias sélectionnés.
 * @param {Object} props Les propriétés du composant.
 * @param {boolean} props.submitting Indique si une opération de soumission est en cours, utilisé pour désactiver les actions du composant pendant la soumission.
 */
export default function MediaLibrary({
  addMedia,
  addMediaLoading,
  editMedia,
  editMediaLoading,
  removeMedia,
  removeMediaLoading,
}: {
  addMedia: useMutation.MutationFunction<
    boolean,
    { input: { file: File | null } },
    ApolloCache
  >;
  addMediaLoading: boolean;
  editMedia: useMutation.MutationFunction<
    boolean,
    { id: string; input: Partial<Media> },
    ApolloCache
  >;
  editMediaLoading: boolean;
  removeMedia: useMutation.MutationFunction<
    boolean,
    { id: string },
    ApolloCache
  >;
  removeMediaLoading: boolean;
}) {
  const { medias, loading, error } = useMedias();
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const [addMedias, setAddMedias] = useState<boolean>(false);
  const [openMediaDialog, setOpenMediaDialog] = useState<string | false>(false);
  const [editingMedias, setEditingMedias] = useState<
    Partial<Media>[] | null | undefined
  >(null);

  const { categories } = useCategories();

  return (
    <>
      <ResponsiveStack
        direction="row"
        rowGap={3}
        columnGap={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        flexWrap="wrap"
        maxWidth="100% !important"
      >
        <ResponsiveTitle variant="h1">Médias</ResponsiveTitle>
        <Button
          onClick={() => setAddMedias(true)}
          startIcon={<Icon path={mdiPlus} size={1} />}
          sx={{ marginLeft: "auto" }}
        >
          Importer des médias
        </Button>
        <ToggleButtonGroup>
          <ToggleButton
            value="grid"
            aria-label="grid view"
            onClick={() => setLayout("grid")}
            selected={layout === "grid"}
          >
            <Icon path={mdiViewGrid} size={1} />
          </ToggleButton>
          <ToggleButton
            value="list"
            aria-label="list view"
            onClick={() => setLayout("list")}
            selected={layout === "list"}
          >
            <Icon path={mdiViewList} size={1} />
          </ToggleButton>
        </ToggleButtonGroup>
      </ResponsiveStack>
      {medias?.length === 0 || !medias || addMedias ? (
        <MediaDropZone
          handleAdd={addMedia}
          submitting={addMediaLoading || editMediaLoading || removeMediaLoading}
        />
      ) : null}
      {loading ? (
        <CircularProgress />
      ) : (
        medias &&
        medias.length > 0 &&
        (layout === "grid" ? (
          <MediaGrid
            mode="library"
            medias={medias}
            setOpenDialog={setOpenMediaDialog}
            handleEdit={editMedia}
            onDelete={removeMedia}
            submitting={
              addMediaLoading || editMediaLoading || removeMediaLoading
            }
          />
        ) : (
          <CustomTable
            fields={[
              {
                key: "id",
                label: "Miniature",
                content: (media: any) => (
                  <Picture image={media} maxWidth="3rem" maxHeight="3rem" />
                ),
              },
              {
                key: "label",
                label: "Label",
              },
              {
                key: "category",
                label: "Catégorie",
                content: (media: any) =>
                  typeof media.category === "string"
                    ? media.category
                    : media.category?.label || "",
              },
            ]}
            items={medias}
            canSelect
            onClickAdd={() => setAddMedias(true)}
            onClickEdit={(mediaId: string) => setOpenMediaDialog(mediaId)}
            onClickDelete={(selectedMedias: string[]) => {
              for (const mediaId of selectedMedias) {
                removeMedia({ variables: { id: mediaId } });
              }
            }}
            submitting={
              addMediaLoading || editMediaLoading || removeMediaLoading
            }
            deleteLabel={`le(s) média(s)`}
            bulkEditTitle="Modifier les médias sélectionnés"
            onClickBulkEdit={() => {
              if (editingMedias) {
                for (const media of editingMedias) {
                  if (media.id) {
                    editMedia({ variables: { id: media.id, input: media } });
                  }
                }
              }
            }}
            setBulkEditItems={setEditingMedias}
            bulkEditContent={
              <CustomSelect
                label="Catégorie"
                labelId="category-label"
                value={
                  typeof editingMedias?.[0]?.category === "string"
                    ? editingMedias[0].category
                    : editingMedias?.[0]?.category?.id || ""
                }
                onChange={(e) => {
                  const valueRaw =
                    typeof e.target === "object" &&
                    e.target !== null &&
                    "value" in e.target
                      ? (e.target as { value: string | string[] }).value
                      : "";
                  const value = Array.isArray(valueRaw)
                    ? (valueRaw[0] ?? "")
                    : valueRaw;

                  setEditingMedias((prev) =>
                    prev
                      ? prev.map((m) => ({
                          ...m,
                          category: value,
                        }))
                      : null,
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
          />
        ))
      )}
      <SnackbarAlert
        open={!!error}
        message={error?.message || "Une erreur est survenue"}
        severity="error"
      />
      <SingleMediaDialog
        medias={medias}
        open={openMediaDialog}
        setOpen={setOpenMediaDialog}
        handleEdit={editMedia}
        handleDelete={removeMedia}
        submitting={addMediaLoading || editMediaLoading || removeMediaLoading}
      />
    </>
  );
}
