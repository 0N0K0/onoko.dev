import { useEffect, useState } from "react";
import useProjectMutations from "../../hooks/mutations/useProjectMutations";
import useProjects from "../../hooks/queries/useProjects";
import EntitiesContent from "../../layout/admin/EntitiesContent";
import ProjectFormDialog from "../../components/entities/ProjectFormDialog";

/**
 * Page d'administration pour la gestion des projets.
 * Cette page affiche une liste de projets existants, avec la possibilité d'ajouter, de modifier ou de supprimer des projets via des dialogues de formulaire.
 * Elle utilise des hooks personnalisés pour récupérer les données des projets et effectuer les mutations nécessaires à leur gestion.
 * Le composant `EntitiesPage` est utilisé pour afficher la liste des projets et gérer les actions d'ajout, de modification et de suppression, tandis que les fonctions de mutation sont gérées par le hook `useProjectMutations`.
 */
export default function Projects() {
  const [submitSuccess, setSubmitSuccess] = useState<string>("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const { projects, loading, error } = useProjects();

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
    if (createProjectData) {
      setSubmitSuccess("Projet créé avec succès");
    } else if (editProjectData) {
      setSubmitSuccess("Projet modifié avec succès");
    } else if (deleteProjectData) {
      setSubmitSuccess("Projet supprimé avec succès");
    }
  }, [createProjectData, editProjectData, deleteProjectData]);

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
            key: "label",
            label: "Label",
            content: (item) => (
              <p style={{ paddingLeft: `${item.depth * 16}px` }}>
                {item.depth > 0 ? `- ` : ""}
                {item.label}
              </p>
            ),
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
