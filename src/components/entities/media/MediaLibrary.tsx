import {
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ClosableSnackbarAlert from "../../custom/ClosableSnackbarAlert";
import SnackbarAlert from "../../custom/SnackbarAlert";
import MediaDropZone from "./MediaDropZone";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiPlus, mdiViewGrid, mdiViewList } from "@mdi/js";
import MediaGrid from "./MediaGrid";
import { Table, TableContainer } from "@mui/material";
import CustomTable from "../../custom/CustomTable/index";
import Picture from "../../custom/Picture";
import SingleMediaDialog from "./SingleMediaDialog";
import CustomSelect from "../../custom/CustomSelect";
import type { Media } from "../../../types/entities/mediaTypes";
import type { Category } from "../../../types/entities/categoryTypes";
import useMedias from "../../../hooks/queries/useMedias";
import useCategories from "../../../hooks/queries/useCategories";
import type { EntityMutationsReturn } from "../../../hooks/mutations/useEntityMutations";
import { extractId, getSelectValue } from "../../../utils/normalizeRef";

/**
 * Composant de gestion de la bibliothèque de médias.
 * Ce composant affiche une liste de médias importés, avec la possibilité de les visualiser en grille ou en liste, ainsi que d'ajouter de nouveaux médias via un système de glisser-déposer.
 * Il utilise des hooks personnalisés pour récupérer les médias et les catégories disponibles, ainsi que pour effectuer les mutations nécessaires à l'ajout, la modification et la suppression des médias.
 * Le composant gère également l'affichage de dialogues pour visualiser un média en détail ou pour modifier les catégories des médias sélectionnés.
 * @param {Object} props Les propriétés du composant.
 * @param {boolean} props.submitting Indique si une opération de soumission est en cours, utilisé pour désactiver les actions du composant pendant la soumission.
 */
export default function MediaLibrary({
  mutations,
}: {
  mutations: EntityMutationsReturn<
    { input: { file: File | null; category?: string } },
    { id: string; input: Partial<Media> }
  >;
}) {
  const submitting =
    mutations.create.loading ||
    mutations.edit.loading ||
    mutations.delete.loading;
  const { medias, loading, error, refetch } = useMedias();
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const [addMedias, setAddMedias] = useState<boolean>(false);
  const [openMediaDialog, setOpenMediaDialog] = useState<string | false>(false);
  const [editingMedias, setEditingMedias] = useState<
    Partial<Media>[] | null | undefined
  >(null);

  const { categories } = useCategories();

  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    if (!mutations.create.loading && mutations.create.data) {
      setSubmitSuccess("Média ajouté avec succès");
      refetch();
    }
  }, [mutations.create.data]);
  useEffect(() => {
    if (!mutations.edit.loading && mutations.edit.data) {
      setSubmitSuccess("Média modifié avec succès");
      refetch();
    }
  }, [mutations.edit.data]);
  useEffect(() => {
    if (!mutations.delete.loading && mutations.delete.data) {
      setSubmitSuccess("Média supprimé avec succès");
      refetch();
    }
  }, [mutations.delete.data]);

  return (
    <>
      <ResponsiveStack
        rowGap={3}
        maxWidth="100% !important"
        sx={{
          flexDirection: "row",
          columnGap: 2,
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h1">Médias</Typography>
        {layout === "list" && (
          <Button
            onClick={() => setAddMedias(true)}
            startIcon={<Icon path={mdiPlus} size={1} />}
            sx={{ marginLeft: "auto" }}
          >
            Importer des médias
          </Button>
        )}
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
      {(medias?.length === 0 || !medias || addMedias) && layout === "list" ? (
        <MediaDropZone
          handleAdd={mutations.create.mutate}
          submitting={submitting}
        />
      ) : null}
      {loading ? (
        <CircularProgress />
      ) : layout === "grid" ? (
        <MediaGrid
          mode="library"
          medias={medias}
          setOpenDialog={setOpenMediaDialog}
          handleEdit={mutations.edit.mutate}
          onDelete={mutations.delete.mutate}
          submitting={submitting}
          addMedias={addMedias}
          setAddMedias={setAddMedias}
          onAddMedia={(file, category) => {
            mutations.create.mutate({
              variables: { input: { file, category } },
            });
          }}
        />
      ) : (
        <CustomTable.Provider
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
              mutations.delete.mutate({ variables: { id: mediaId } });
            }
          }}
          submitting={submitting}
          deleteLabel={`le(s) média(s)`}
          bulkEditTitle="Modifier les médias sélectionnés"
          onClickBulkEdit={() => {
            if (editingMedias) {
              for (const media of editingMedias) {
                if (media.id) {
                  mutations.edit.mutate({
                    variables: { id: media.id, input: media },
                  });
                }
              }
            }
          }}
          setBulkEditItems={setEditingMedias}
          bulkEditContent={
            <CustomSelect
              label="Catégorie"
              labelId="category-label"
              value={extractId(editingMedias?.[0]?.category) ?? ""}
              onChange={(e) => {
                const value = getSelectValue(e);
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
        >
          <TableContainer sx={{ flex: "1 1 auto", minHeight: 0 }}>
            <Table stickyHeader>
              <CustomTable.Header />
              <CustomTable.Body />
              <CustomTable.BulkFooter />
            </Table>
          </TableContainer>
          <CustomTable.Dialogs />
        </CustomTable.Provider>
      )}
      <ClosableSnackbarAlert
        open={!!submitSuccess}
        setOpen={() => setSubmitSuccess("")}
        message={submitSuccess}
        severity="success"
      />
      <SnackbarAlert
        open={
          !!(
            error ||
            mutations.create.error ||
            mutations.edit.error ||
            mutations.delete.error
          )
        }
        message={
          error?.message ||
          mutations.create.error?.message ||
          mutations.edit.error?.message ||
          mutations.delete.error?.message ||
          "Une erreur est survenue"
        }
        severity="error"
      />
      <SingleMediaDialog
        medias={medias}
        open={openMediaDialog}
        setOpen={setOpenMediaDialog}
        handleEdit={mutations.edit.mutate}
        handleDelete={mutations.delete.mutate}
        submitting={submitting}
      />
    </>
  );
}
