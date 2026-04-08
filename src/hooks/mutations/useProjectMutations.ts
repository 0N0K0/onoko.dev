import {
  CREATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  UPDATE_PROJECT_MUTATION,
} from "../../services/project/projectMutations";
import type {
  Project,
  useProjectMutationProps,
} from "../../types/entities/projectTypes";
import { useEntityMutation } from "./useEntityMutation";

export default function useProjectMutations({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  setFormDialogOpen,
  projects,
  setProjects,
}: useProjectMutationProps): {
  handleAdd: (item: Partial<Project>) => Promise<void>;
  handleEdit: (item: Partial<Project>) => Promise<void>;
  handleDelete: (selectedProjects: string[]) => Promise<void>;
} {
  const addProject = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
  });
  const handleAdd = async (item: Partial<Project>) => {
    await addProject({
      mutation: CREATE_PROJECT_MUTATION,
      variables: item,
      onSuccess: (data) => {
        setProjects((prev) => [...(prev || []), data.createProject]);
        setSubmitSuccess?.(
          `Le projet ${data.createProject.label} a été créé avec succès.`,
        );
      },
      reset: true,
    });
  };

  const editProject = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
  });
  const handleEdit = async (item: Partial<Project>) => {
    await editProject({
      mutation: UPDATE_PROJECT_MUTATION,
      variables: item,
      onSuccess: (data) => {
        setProjects((prev) =>
          prev?.map((p) =>
            p.id === data.updateProject.id ? data.updateProject : p,
          ),
        );
        setSubmitSuccess?.(
          `Le projet ${data.updateProject.label} a été modifié avec succès.`,
        );
      },
      reset: true,
    });
  };

  const deleteProject = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
  });
  const handleDelete = async (selectedProjects: string[]) => {
    for (const projectId of selectedProjects) {
      const project = projects?.find((p) => p.id === projectId);
      await deleteProject({
        mutation: DELETE_PROJECT_MUTATION,
        variables: { id: projectId },
        onSuccess: () => {
          setProjects((prev) => prev?.filter((p) => p.id !== projectId));
          setSubmitSuccess?.(
            `Le projet ${project?.label || projectId} a été supprimé avec succès.`,
          );
        },
      });
    }
  };

  return { handleAdd, handleEdit, handleDelete };
}
