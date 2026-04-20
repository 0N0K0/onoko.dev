import { useEffect, useState } from "react";
import useProjectMutations from "../../hooks/mutations/useProjectMutations";
import useProjects from "../../hooks/queries/useProjects";
import EntitiesContent from "../../layout/admin/EntitiesContent";
import ProjectFormDialog from "../../components/entities/ProjectFormDialog";
import type { Project } from "../../types/entities/projectTypes";
import Picture from "../../components/custom/Picture";
import type { Category } from "../../types/entities/categoryTypes";

/**
 * Page d'administration pour la gestion des projets.
 * Cette page affiche une liste de projets existants, avec la possibilité d'ajouter, de modifier ou de supprimer des projets via des dialogues de formulaire.
 * Elle utilise des hooks personnalisés pour récupérer les données des projets et effectuer les mutations nécessaires à leur gestion.
 * Le composant `EntitiesPage` est utilisé pour afficher la liste des projets et gérer les actions d'ajout, de modification et de suppression, tandis que les fonctions de mutation sont gérées par le hook `useProjectMutations`.
 */
export default function Projects() {
  const [submitSuccess, setSubmitSuccess] = useState<string>("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const { projects, loading, error, refetch } = useProjects();

  useEffect(() => {
    console.log("Projects data:", projects);
  }, [projects]);

  const {
    createProject,
    createProjectData,
    createProjectLoading,
    createProjectError,
    editProject,
    editProjectData,
    editProjectLoading,
    editProjectError,
    deleteProject,
    deleteProjectData,
    deleteProjectLoading,
    deleteProjectError,
  } = useProjectMutations();

  useEffect(() => {
    if (!createProjectLoading && createProjectData) {
      setSubmitSuccess("Projet créé avec succès");
      setFormDialogOpen(false);
      refetch();
    }
  }, [createProjectData]);
  useEffect(() => {
    if (!editProjectLoading && editProjectData) {
      setSubmitSuccess("Projet modifié avec succès");
      setFormDialogOpen(false);
      refetch();
    }
  }, [editProjectData]);
  useEffect(() => {
    if (!deleteProjectLoading && deleteProjectData) {
      setSubmitSuccess("Projet supprimé avec succès");
      refetch();
    }
  }, [deleteProjectData]);

  return (
    <>
      <EntitiesContent
        labels={{
          title: "Projets",
          addButton: "Ajouter un projet",
          entity: "projets",
        }}
        items={projects}
        loading={loading}
        fields={[
          {
            key: "client.logo",
            label: "Logo",
            content: (item: Project) =>
              typeof item.client?.logo === "object" ? (
                <Picture
                  image={item.client.logo}
                  maxHeight="48px"
                  maxWidth="48px"
                />
              ) : null,
          },
          {
            key: "client.label",
            label: "Client",
            content: (item: Project) => item.client?.label,
          },
          {
            key: "label",
            label: "Label",
            content: (item: Project) => item.label,
          },
          {
            key: "startDate",
            label: "Date de début",
            content: (item: Project) => item.startDate?.format("MM/YYYY"),
          },
          {
            key: "categories",
            label: "Catégories",
            content: (item: Project) =>
              item.categories
                ?.filter(
                  (category): category is Category =>
                    typeof category === "object",
                )
                .map((category: Category) => category.label)
                .join(", "),
          },
        ]}
        onClickActions={{
          add: () => setFormDialogOpen(true),
          edit: (id: string) => setFormDialogOpen(id),
          delete: deleteProject,
        }}
        submitting={
          createProjectLoading || editProjectLoading || deleteProjectLoading
        }
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        error={
          error?.message ||
          createProjectError?.message ||
          editProjectError?.message ||
          deleteProjectError?.message ||
          ""
        }
      />
      <ProjectFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        projects={projects}
        handleAdd={createProject}
        handleEdit={editProject}
        submitting={
          createProjectLoading || editProjectLoading || deleteProjectLoading
        }
      />
    </>
  );
}
