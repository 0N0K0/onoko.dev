import { useEffect, useState } from "react";
import type { Stack } from "../../types/entities/stackTypes";
import useStackMutations from "../../hooks/mutations/useStackMutation";
import EntitiesContent from "../../layout/admin/EntitiesContent";
import StackFormDialog from "../../components/entities/StackFormDialog";
import { API_URL } from "../../constants/apiConstants";
import useStacks from "../../hooks/queries/useStacks";

/**
 * Page d'administration pour la gestion des technologies (stacks).
 * Cette page affiche une liste de technologies existantes, avec la possibilité d'ajouter, de modifier ou de supprimer des technologies via des dialogues de formulaire.
 * Elle utilise des hooks personnalisés pour récupérer les données des technologies et effectuer les mutations nécessaires à leur gestion.
 * Le composant `EntitiesContent` est utilisé pour afficher la liste des technologies et gérer les actions d'ajout, de modification et de suppression, tandis que le composant `StackFormDialog` est utilisé pour afficher le formulaire d'ajout/modification dans un dialogue.
 */
export default function Stacks() {
  const [submitSuccess, setSubmitSuccess] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const { stacks, loading, error } = useStacks();

  const {
    createStack,
    createStackData,
    createStackLoading,
    createStackError,
    editStack,
    editStackData,
    editStackLoading,
    editStackError,
    deleteStack,
    deleteStackData,
    deleteStackLoading,
    deleteStackError,
  } = useStackMutations();

  useEffect(() => {
    if (createStackData) {
      setSubmitSuccess("Technologie créée avec succès");
      setFormDialogOpen(false);
    } else if (editStackData) {
      setSubmitSuccess("Technologie modifiée avec succès");
      setFormDialogOpen(false);
    } else if (deleteStackData) {
      setSubmitSuccess("Technologie supprimée avec succès");
    }
  }, [createStackData, editStackData, deleteStackData]);

  return (
    <>
      <EntitiesContent
        labels={{
          title: "Technologies",
          addButton: "Ajouter une technologie",
          entity: "stacks",
        }}
        items={stacks}
        loading={loading}
        fields={[
          {
            key: "icon",
            label: "Icone",
            content: (item: Stack) =>
              typeof item.icon === "object" ? (
                <img
                  src={API_URL + item.icon?.path}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    objectFit: "contain",
                  }}
                />
              ) : null,
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
          delete: deleteStack,
        }}
        submitting={
          createStackLoading || editStackLoading || deleteStackLoading
        }
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        error={
          error?.message ||
          createStackError?.message ||
          editStackError?.message ||
          deleteStackError?.message ||
          ""
        }
      />
      <StackFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        stacks={stacks}
        handleAdd={createStack}
        handleEdit={editStack}
        submitting={
          createStackLoading || editStackLoading || deleteStackLoading
        }
      />
    </>
  );
}
