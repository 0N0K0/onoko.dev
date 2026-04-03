import { useState } from "react";
import type { Stack } from "../../types/stackTypes";
import useStackMutations from "../../hooks/mutations/useStackMutation";
import EntitiesPage from "../../components/entities/EntitiesPage";
import { STACKS_QUERY } from "../../services/stack/stackQueries";
import StackFormDialog from "../../components/entities/StackFormDialog";
import { API_URL } from "../../constants/apiConstants";

export default function Stacks() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const [stacks, setStacks] = useState<Stack[] | undefined>(undefined);

  const { handleAdd, handleEdit, handleDelete } = useStackMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
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
                style={{ width: "3rem", height: "3rem", objectFit: "contain" }}
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
          {
            key: "versions",
            label: "Versions",
            content: (item: Stack) => item.versions.join(", "),
          },
          {
            key: "skills",
            label: "Compétences",
            content: (item: Stack) =>
              item.skills.length > 0 ? item.skills.length : "",
          },
        ]}
        onClickActions={{
          add: () => setFormDialogOpen(true),
          edit: (id: string) => setFormDialogOpen(id),
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
        stacks={stacks}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        submitting={submitting}
      />
    </>
  );
}
