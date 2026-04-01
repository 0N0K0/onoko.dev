import { useEffect, useState } from "react";
import ResponsiveTitle from "../../components/custom/responsiveTitle";
import ClosableSnackbarAlert from "../../components/custom/closableSnackbarAlert";
import { Button, CircularProgress } from "@mui/material";
import type { Category } from "../../types/categoryTypes";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import apolloClient from "../../services/appolloClient";
import { CATEGORIES_QUERY } from "../../services/categoryQueries";
import {
  CREATE_CATEGORY_MUTATION,
  DELETE_CATEGORY_MUTATION,
  UPDATE_CATEGORY_MUTATION,
} from "../../services/categoryMutations";
import CategoriesTable from "../../components/category/CategoriesTable";
import CategoryFormDialog from "../../components/category/CategoryFormDialog";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";
import SnackbarAlert from "../../components/custom/snackbarAlert";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[] | undefined>([]);

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

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
    setCategories((prev) =>
      data.createCategory ? [...(prev || []), data.createCategory] : prev,
    );
    try {
      setSubmitSuccess(
        `La catégorie ${data.createCategory.label} a été créée avec succès.`,
      );
    } catch (e: any) {
      setSubmitError(e.message || "Une erreur inconnue est survenue.");
    } finally {
      setSubmitting(false);
      setFormDialogOpen(false);
      setInitialCategory(null);
      setLabel("");
      setEntity("");
      setDescription("");
      setParent("");
      setHasChanges(false);
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
      setCategories((prev) =>
        prev?.map((c) =>
          c.id === data.updateCategory.id ? data.updateCategory : c,
        ),
      );
      setSubmitSuccess(
        `La catégorie ${data.updateCategory.label} a été modifiée avec succès.`,
      );
    } catch (e: any) {
      setSubmitError(e.message || "Une erreur inconnue est survenue.");
    } finally {
      setSubmitting(false);
      setFormDialogOpen(false);
      setInitialCategory(null);
      setLabel("");
      setEntity("");
      setDescription("");
      setParent("");
      setHasChanges(false);
    }
  };

  const handleDelete = async (selectedCategories: string[]) => {
    setSubmitSuccess("");
    setSubmitError("");
    setSubmitting(true);
    try {
      for (const categoryId of selectedCategories) {
        const category = categories?.find((c) => c.id === categoryId);
        const { data } = await apolloClient.mutate<{ deleteCategory: boolean }>(
          {
            mutation: DELETE_CATEGORY_MUTATION,
            variables: { id: categoryId },
          },
        );
        if (!data || !data.deleteCategory)
          throw new Error(
            `Une erreur est survenue lors de la suppression de la catégorie ${category?.label || categoryId}.`,
          );
        setCategories((prev) => prev?.filter((c) => c.id !== categoryId));
        setSubmitSuccess(
          `La catégorie ${category?.label || categoryId} a été supprimée avec succès.`,
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
      <ResponsiveStack
        direction="row"
        rowGap={3}
        columnGap={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        flexWrap="wrap"
      >
        <ResponsiveTitle variant="h1">Catégories</ResponsiveTitle>
        {categories && categories.length === 0 && (
          <Button
            onClick={() => setFormDialogOpen(true)}
            startIcon={<Icon path={mdiPlus} size={1} />}
            sx={{ marginX: "auto" }}
          >
            Ajouter une&nbsp;catégorie
          </Button>
        )}
      </ResponsiveStack>
      {loading ? (
        <CircularProgress />
      ) : (
        categories &&
        categories.length > 0 && (
          <CategoriesTable
            categories={categories}
            setInitialCategory={setInitialCategory}
            setLabel={setLabel}
            setEntity={setEntity}
            setDescription={setDescription}
            setParent={setParent}
            setFormDialogOpen={setFormDialogOpen}
            onClickDelete={(selectedCategories: string[]) =>
              handleDelete(selectedCategories)
            }
            submitting={submitting}
          />
        )
      )}
      <CategoryFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        categories={categories}
        initialCategory={initialCategory}
        setInitialCategory={setInitialCategory}
        label={label}
        setLabel={setLabel}
        entity={entity}
        setEntity={setEntity}
        description={description}
        setDescription={setDescription}
        parent={parent}
        setParent={setParent}
        hasChanges={hasChanges}
        setHasChanges={setHasChanges}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        submitting={submitting}
      />
      <ClosableSnackbarAlert
        open={!!submitSuccess}
        setOpen={() => setSubmitSuccess("")}
        message={submitSuccess}
        severity="success"
      />
      <SnackbarAlert
        open={!!submitError || !!categoryError}
        message={categoryError || submitError || "Une erreur est survenue"}
        severity="error"
      />
    </>
  );
}
