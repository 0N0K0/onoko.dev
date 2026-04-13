import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProjectMutations from "../../../hooks/mutations/useProjectMutations";
import useProjects from "../../../hooks/queries/useProjects";
import EntitiesContent from "../../../layout/admin/EntitiesContent";

/**
 * Page d'administration pour la gestion des projets.
 * Cette page affiche une liste de projets existants, avec la possibilité d'ajouter, de modifier ou de supprimer des projets via des dialogues de formulaire.
 * Elle utilise des hooks personnalisés pour récupérer les données des projets et effectuer les mutations nécessaires à leur gestion.
 * Le composant `EntitiesPage` est utilisé pour afficher la liste des projets et gérer les actions d'ajout, de modification et de suppression, tandis que les fonctions de mutation sont gérées par le hook `useProjectMutations`.
 */
export default function Projects() {
  const navigate = useNavigate();

  const [submitSuccess, setSubmitSuccess] = useState<string>("");

  const { projects, loading, error } = useProjects();

  const {
    createProjectData,
    createProjectLoading,
    createProjectError,
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
        add: () => navigate(`/admin/project`),
        edit: (id: string) => navigate(`/admin/project?id=${id}`),
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
  );
}
