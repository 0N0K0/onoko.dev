import { useEffect, useState } from "react";
import ResponsiveTitle from "../../components/custom/responsiveTitle";
import ClosableSnackbar from "../../components/custom/closableSnackbar";
import CustomSnackbar from "../../components/custom/customSnackBar";
import {
  Button,
  Checkbox,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import type { Category } from "../../types/categoryTypes";
import Icon from "@mdi/react";
import {
  mdiCheckOutline,
  mdiClose,
  mdiDelete,
  mdiPencil,
  mdiPlus,
} from "@mdi/js";
import CustomDialog from "../../components/custom/customDialog";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";
import apolloClient from "../../services/appolloClient";
import { CATEGORIES_QUERY } from "../../services/categoryQueries";
import {
  CREATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from "../../services/categoryMutations";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[] | undefined>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [initialCategory, setInitialCategory] = useState<Category | null>(null);
  const [label, setLabel] = useState("");
  const [entity, setEntity] = useState("");
  const [description, setDescription] = useState("");
  const [parent, setParent] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const fetchCategories = async () => {
    setLoading(true);
    setCategoryError("");
    try {
      const { data } = await apolloClient.query<{ categories: Category[] }>({
        query: CATEGORIES_QUERY,
        fetchPolicy: "no-cache",
      });
      setCategories(data?.categories);
    } catch (e: any) {
      setCategoryError(e.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelectMultiple = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCategories(categories?.map((c) => c.id) || []);
    } else {
      setSelectedCategories([]);
    }
  };

  const handleAdd = async () => {
    setSubmitSuccess("");
    setSubmitError("");
    setSubmitting(true);
    const editedFields: Partial<Category> = { label, entity };
    if (description !== initialCategory?.description)
      editedFields.description = description;
    if (parent !== initialCategory?.parent) editedFields.parent = parent;
    const { data } = await apolloClient.mutate<{
      createCategory: Category;
    }>({
      mutation: CREATE_CATEGORY_MUTATION,
      variables: editedFields,
    });
    if (!data || !data.createCategory)
      throw new Error(
        "Une erreur est survenue lors de la création de la catégorie.",
      );

    try {
      setSubmitSuccess("La catégorie a été créée avec succès.");
    } catch (e: any) {
      setSubmitError(e.message || "Une erreur inconnue est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async () => {
    setSubmitSuccess("");
    setSubmitError("");
    setSubmitting(true);
    try {
      if (!initialCategory) throw new Error("Catégorie non chargée");
      if (!hasChanges) throw new Error("Aucun changement à enregistrer");
      const editedFields: Partial<Category> = {};
      if (label !== initialCategory.label) editedFields.label = label;
      if (entity !== initialCategory.entity) editedFields.entity = entity;
      if (description !== initialCategory.description)
        editedFields.description = description;
      if (parent !== initialCategory.parent) editedFields.parent = parent;
      const { data } = await apolloClient.mutate<{
        updateCategory: Category;
      }>({
        mutation: UPDATE_CATEGORY_MUTATION,
        variables: { id: initialCategory.id, ...editedFields },
      });
      if (!data || !data.updateCategory)
        throw new Error(
          `Une erreur est survenue lors de la modification de la catégorie ${initialCategory.label}.`,
        );
      setSubmitSuccess(`La catégorie ${label} a été modifiée avec succès.`);
    } catch (e: any) {
      setSubmitError(e.message || "Une erreur inconnue est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitSuccess("");
    setSubmitError("");
    setSubmitting(true);
    try {
      for (const categoryId of selectedCategories) {
        const { data } = await apolloClient.mutate<{ deleteCategory: boolean }>(
          {
            mutation: DELETE_CATEGORY_MUTATION,
            variables: { id: categoryId },
          },
        );
        if (!data || !data.deleteCategory)
          throw new Error(
            `Une erreur est survenue lors de la suppression de la catégorie ${categoryId}.`,
          );
        setSubmitSuccess(
          `La catégorie ${categoryId} a été supprimée avec succès.`,
        );
      }
    } catch (e: any) {
      setSubmitError(e.message || "Une erreur inconnue est survenue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ResponsiveTitle variant="h1" width="100%">
        Catégories
      </ResponsiveTitle>
      <ClosableSnackbar
        open={!!submitSuccess}
        setOpen={() => setSubmitSuccess("")}
        message={submitSuccess || "L'action a été réalisée avec succès."}
        severity="success"
      />
      <CustomSnackbar
        open={!!submitError || !!categoryError}
        message={categoryError || submitError || "Une erreur est survenue"}
        severity="error"
      />
      {loading ? (
        <CircularProgress />
      ) : categories && categories.length > 0 ? (
        <>
          <CustomDialog
            key="formDialog"
            open={!!formDialogOpen}
            onClose={() => setFormDialogOpen(false)}
            title={`${
              typeof formDialogOpen === "string" ? "Modifier la" : "Ajouter une"
            } catégorie`}
            content={(() => {
              const category =
                typeof formDialogOpen === "string"
                  ? categories?.find((c) => c.id === formDialogOpen)
                  : null;
              return (
                <ResponsiveStack rowGap={3}>
                  <TextField
                    label="Label"
                    value={label}
                    onChange={(e) => {
                      setLabel(e.target.value);
                      e.target.value !== (initialCategory?.label || "") &&
                        setHasChanges(true);
                    }}
                    required
                    fullWidth
                  />
                  <Select
                    label="Entité"
                    value={entity}
                    onChange={(e) => {
                      setEntity(e.target.value);
                      e.target.value !== (initialCategory?.entity || "") &&
                        setHasChanges(true);
                    }}
                    required
                    fullWidth
                  >
                    <MenuItem value="stack">Technologies</MenuItem>
                    <MenuItem value="project">Projets</MenuItem>
                  </Select>
                  <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                      e.target.value !== (initialCategory?.description || "") &&
                        setHasChanges(true);
                    }}
                    multiline
                    rows={4}
                    fullWidth
                  />
                  <Select
                    label="Catégorie parente"
                    value={parent}
                    onChange={(e) => {
                      setParent(e.target.value);
                      e.target.value !== (initialCategory?.parent || "") &&
                        setHasChanges(true);
                    }}
                    fullWidth
                  >
                    <MenuItem value="">Aucune</MenuItem>
                    {categories
                      ?.filter((c) => c.id !== category?.id)
                      .map((c) => (
                        <MenuItem key={c.id} value={c.id}>
                          {c.label}
                        </MenuItem>
                      ))}
                  </Select>
                </ResponsiveStack>
              );
            })()}
            actions={[
              <Button
                key="cancel"
                onClick={() => setFormDialogOpen(false)}
                disabled={submitting}
                startIcon={<Icon path={mdiClose} />}
              >
                Annuler
              </Button>,
              <Button
                key="confirm"
                color="success"
                onClick={
                  typeof formDialogOpen === "string" ? handleEdit : handleAdd
                }
                disabled={submitting || !hasChanges || !label || !entity}
                startIcon={<Icon path={mdiCheckOutline} />}
              >
                {typeof formDialogOpen === "string" ? "Modifier" : "Ajouter"}
              </Button>,
            ]}
          />
          <CustomDialog
            key="deleteDialog"
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            title={`Voulez-vous supprimer ${selectedCategories.length > 1 ? "ces catégories" : "cette catégorie"} ?`}
            content="Cette action est irréversible et supprimera toutes les données associées."
            actions={[
              <Button
                key="cancel"
                onClick={() => setDeleteDialogOpen(false)}
                disabled={submitting}
                startIcon={<Icon path={mdiClose} />}
              >
                Annuler
              </Button>,
              <Button
                key="confirm"
                color="error"
                onClick={() => {
                  handleDelete();
                  setDeleteDialogOpen(false);
                }}
                disabled={submitting}
                startIcon={<Icon path={mdiDelete} />}
              >
                Supprimer
              </Button>,
            ]}
          />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox
                    indeterminate={
                      selectedCategories.length > 0 &&
                      selectedCategories.length < (categories?.length || 0)
                    }
                    checked={
                      categories?.length > 0 &&
                      selectedCategories.length === categories.length
                    }
                    onChange={handleSelectMultiple}
                  />
                </TableCell>
                <TableCell>Entité</TableCell>
                <TableCell>Label</TableCell>
                <TableCell>
                  <IconButton
                    disabled={submitting}
                    onClick={() => setFormDialogOpen(true)}
                  >
                    <Icon path={mdiPlus}></Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedCategories.includes(category.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedCategories((prev) => [
                            ...prev,
                            category.id,
                          ]);
                        } else {
                          setSelectedCategories((prev) =>
                            prev.filter((id) => id !== category.id),
                          );
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{category.entity}</TableCell>
                  <TableCell>{category.label}</TableCell>
                  <TableCell>
                    <IconButton
                      color="warning"
                      disabled={submitting}
                      onClick={() => {
                        setInitialCategory(category);
                        setLabel(category.label);
                        setEntity(category.entity || "");
                        setDescription(category.description || "");
                        setParent(category.parent || "");
                        setFormDialogOpen(category.id);
                      }}
                    >
                      <Icon path={mdiPencil}></Icon>
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => {
                        setSelectedCategories([category.id]);
                        setDeleteDialogOpen(true);
                      }}
                      disabled={submitting}
                    >
                      <Icon path={mdiDelete}></Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>
                  <Button
                    color="error"
                    startIcon={<Icon path={mdiDelete} />}
                    onClick={handleDelete}
                    disabled={selectedCategories.length < 1 || submitting}
                  >
                    Supprimer les catégories sélectionnées
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </>
      ) : (
        <Button
          onClick={() => setFormDialogOpen(true)}
          startIcon={<Icon path={mdiPlus} />}
        >
          Ajouter une catégorie
        </Button>
      )}
    </>
  );
}
