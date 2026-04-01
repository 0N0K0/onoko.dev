import { useEffect, useState } from "react";
import ResponsiveTitle from "../../components/custom/responsiveTitle";
import ClosableSnackbarAlert from "../../components/custom/closableSnackbarAlert";
import { Button, CircularProgress } from "@mui/material";
import type { Category } from "../../types/categoryTypes";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import apolloClient from "../../services/appolloClient";
import { CATEGORIES_QUERY } from "../../services/categoryQueries";
import CategoryFormDialog from "../../components/category/CategoryFormDialog";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";
import SnackbarAlert from "../../components/custom/snackbarAlert";
import CustomTable from "../../components/custom/customTable";
import useCategoryAdd from "../../hooks/category/useCategoryAdd";
import useCategoryEdit from "../../hooks/category/useCategoryEdit";
import useCategoryDelete from "../../hooks/category/useCategoryDelete";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[] | undefined>([]);
  const [categoryError, setCategoryError] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const [initialCategory, setInitialCategory] = useState<Category | null>(null);
  const [editingCategory, setEditingCategory] =
    useState<Partial<Category> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

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

  const handleAdd = useCategoryAdd({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    editingCategory,
    setEditingCategory,
    setCategories,
  });

  const handleEdit = useCategoryEdit({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    setInitialCategory,
    editingCategory,
    setEditingCategory,
    setHasChanges,
    setCategories,
  });

  const handleDelete = useCategoryDelete({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    categories,
    setCategories,
  });

  const entitiesMap: { [key: string]: string } = {
    "": "",
    stack: "Technologie",
    project: "Projet",
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
          <CustomTable
            fields={[
              { key: "label", label: "Label" },
              {
                key: "entity",
                label: "Entité",
                content: (item) => entitiesMap[item.entity || ""],
              },
            ]}
            items={categories}
            canSelect
            onClickAdd={() => {
              setEditingCategory({
                label: "",
                entity: "",
                description: "",
                parent: "",
              });
              setFormDialogOpen(true);
            }}
            onClickEdit={(category) => {
              setInitialCategory(category);
              setEditingCategory(category);
              setFormDialogOpen(category.id);
            }}
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
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
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
