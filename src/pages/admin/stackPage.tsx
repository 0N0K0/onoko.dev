import { useState } from "react";
import type { Stack } from "../../types/stackTypes";
import useStackMutations from "../../hooks/useStackMutation";
import EntitiesPage from "../../components/entities/EntitiesPage";
import { STACKS_QUERY } from "../../services/stack/stackQueries";
import StackFormDialog from "../../components/stack/StackFormDialog";
import { API_URL } from "../../constants/apiConstants";

export default function Stacks() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const [initialStack, setInitialStack] = useState<Stack | null>(null);
  const [editingStack, setEditingStack] = useState<
    (Partial<Stack> & { iconFile?: File | null }) | null
  >(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [stacks, setStacks] = useState<Stack[] | undefined>(undefined);

  const handleClickAdd = () => {
    setFormDialogOpen(true);
    setEditingStack({
      label: "",
      description: "",
      iconFile: null,
      versions: [],
      category: "",
    });
  };

  const handleClickEdit = (id: string) => {
    setFormDialogOpen(id);
    const stack = stacks?.find((s) => s.id === id) || null;
    setInitialStack(stack);
    setEditingStack(stack);
  };

  const handleDropIcon = (files: File[]) => {
    if (files && files.length > 0) {
      setEditingStack(
        editingStack ? { ...editingStack, iconFile: files[0] } : null,
      );
      setHasChanges(true);
    }
  };

  const { handleAdd, handleEdit, handleDelete } = useStackMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    setInitialStack,
    editingStack,
    setEditingStack,
    setHasChanges,
    stacks,
    setStacks,
  });

  return (
    <>
      <EntitiesPage
        labels={{
          title: "Technologies",
          addButton: "Ajouter une technologie",
          entity: "stacks",
        }}
        items={stacks}
        setItems={setStacks}
        query={STACKS_QUERY}
        fields={[
          {
            key: "iconUrl",
            label: "Icone",
            content: (item: Stack) => (
              <img
                src={API_URL + item.iconUrl}
                style={{ width: "3rem", height: "3rem" }}
              />
            ),
          },
          { key: "label", label: "Label" },
          {
            key: "category",
            label: "Catégorie",
            content: (item: Stack) =>
              typeof item.category === "string"
                ? item.category
                : item.category?.label,
          },
        ]}
        onClickActions={{
          add: handleClickAdd,
          edit: handleClickEdit,
          delete: handleDelete,
        }}
        submitting={submitting}
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        submitError={submitError}
      />
      <StackFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        initialStack={initialStack}
        setInitialStack={setInitialStack}
        editingStack={editingStack}
        setEditingStack={setEditingStack}
        onDropIcon={handleDropIcon}
        hasChanges={hasChanges}
        setHasChanges={setHasChanges}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        submitting={submitting}
      />
    </>
  );
}
