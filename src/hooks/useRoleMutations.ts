import {
  CREATE_ROLE_MUTATION,
  DELETE_ROLE_MUTATION,
  UPDATE_ROLE_MUTATION,
} from "../services/role/roleMutations";
import type { useRoleMutationProps } from "../types/roleTypes";
import { useEntityMutation } from "./useEntityMutation";

export default function useRoleMutations({
  setSubmitSuccess,
  setSubmitError,
  setSubmitting,
  setFormDialogOpen,
  setInitialRole,
  editingRole,
  setEditingRole,
  setHasChanges,
  roles,
  setRoles,
}: useRoleMutationProps): {
  handleAdd: () => Promise<void>;
  handleEdit: () => Promise<void>;
  handleDelete: (selectedRoles: string[]) => Promise<void>;
} {
  // Ajouter un rôle
  const addRole = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    setEditingItem: setEditingRole,
  });
  const handleAdd = async () => {
    await addRole({
      mutation: CREATE_ROLE_MUTATION,
      variables: editingRole,
      onSuccess: (data) => {
        setRoles((prev) => [...(prev || []), data.createRole]);
        setSubmitSuccess?.(
          `Le rôle ${data.createRole.label} a été créé avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Modifier un rôle
  const editRole = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    setInitialItem: setInitialRole,
    setEditingItem: setEditingRole,
    setHasChanges,
  });
  const handleEdit = async () => {
    await editRole({
      mutation: UPDATE_ROLE_MUTATION,
      variables: editingRole,
      onSuccess: (data) => {
        setRoles((prev) =>
          prev?.map((r) => (r.id === data.updateRole.id ? data.updateRole : r)),
        );
        setSubmitSuccess?.(
          `Le rôle ${data.updateRole.label} a été modifié avec succès.`,
        );
      },
      reset: true,
    });
  };

  // Supprimer un ou plusieurs rôles
  const deleteRole = useEntityMutation({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
  });
  const handleDelete = async (selectedRoles: string[]) => {
    for (const roleId of selectedRoles) {
      const role = roles?.find((r) => r.id === roleId);
      await deleteRole({
        mutation: DELETE_ROLE_MUTATION,
        variables: { id: roleId },
        onSuccess: () => {
          setRoles((prev) => prev?.filter((r) => r.id !== roleId));
          setSubmitSuccess?.(
            `Le rôle ${role?.label || roleId} a été supprimé avec succès.`,
          );
        },
      });
    }
  };

  return {
    handleAdd,
    handleEdit,
    handleDelete,
  };
}
