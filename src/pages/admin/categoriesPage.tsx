import { useEffect, useState } from "react";
import ResponsiveTitle from "../../components/custom/responsiveTitle";
import ClosableSnackbar from "../../components/custom/closableSnackbar";
import CustomSnackbar from "../../components/custom/customSnackBar";
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
import DeleteCategoryDialog from "../../components/category/DeleteCategoryDialog";
import CategoriesTable from "../../components/category/CategoriesTable";
import CategoryFormDialog from "../../components/category/CategoryFormDialog";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";

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

  const handleDelete = async () => {
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
      setDeleteDialogOpen(false);
      setSelectedCategories([]);
    }
  };

  return (
    <>
      <ResponsiveStack
        direction="row"
        rowGap={0}
        columnGap={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        flexWrap="wrap"
      >
        <ResponsiveTitle variant="h1">Catégories</ResponsiveTitle>
        <Button
          onClick={() => setFormDialogOpen(true)}
          startIcon={<Icon path={mdiPlus} size={1} />}
        >
          Ajouter une&nbsp;catégorie
        </Button>
      </ResponsiveStack>
      {loading ? (
        <CircularProgress />
      ) : (
        categories &&
        categories.length > 0 && (
          <CategoriesTable
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            handleSelectMultiple={handleSelectMultiple}
            setInitialCategory={setInitialCategory}
            setLabel={setLabel}
            setEntity={setEntity}
            setDescription={setDescription}
            setParent={setParent}
            setFormDialogOpen={setFormDialogOpen}
            setDeleteDialogOpen={setDeleteDialogOpen}
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
      <DeleteCategoryDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        selectedCategories={selectedCategories}
        handleDelete={handleDelete}
        submitting={submitting}
      />
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
    </>
  );
}
