import { useEffect, useState } from "react";
import EntitiesContent from "../../layout/admin/EntitiesContent";
import useRoleMutations from "../../hooks/mutations/useRoleMutations";
import RoleFormDialog from "../../components/entities/RoleFormDialog";
import useRoles from "../../hooks/queries/useRoles";

/**
 * Page d'administration pour la gestion des rôles
 * Affiche une liste des rôles existants et permet d'ajouter, modifier ou supprimer des rôles
 */
export default function Roles() {
  const [submitSuccess, setSubmitSuccess] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const { roles, loading, error, refetch } = useRoles();

  const {
    createRole,
    createRoleData,
    createRoleLoading,
    createRoleError,
    editRole,
    editRoleData,
    editRoleLoading,
    editRoleError,
    deleteRole,
    deleteRoleData,
    deleteRoleLoading,
    deleteRoleError,
  } = useRoleMutations();

  useEffect(() => {
    if (!createRoleLoading && createRoleData) {
      setSubmitSuccess("Rôle créé avec succès");
      setFormDialogOpen(false);
      refetch();
    }
  }, [createRoleData]);
  useEffect(() => {
    if (!editRoleLoading && editRoleData) {
      setSubmitSuccess("Rôle modifié avec succès");
      setFormDialogOpen(false);
      refetch();
    }
  }, [editRoleData]);
  useEffect(() => {
    if (!deleteRoleLoading && deleteRoleData) {
      setSubmitSuccess("Rôle supprimé avec succès");
      refetch();
    }
  }, [deleteRoleData]);

  return (
    <>
      <EntitiesContent
        labels={{
          title: "Rôles",
          addButton: "Ajouter un rôle",
          entity: "roles",
        }}
        items={roles}
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
          delete: deleteRole,
        }}
        submitting={createRoleLoading || editRoleLoading || deleteRoleLoading}
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        error={
          error?.message ||
          createRoleError?.message ||
          editRoleError?.message ||
          deleteRoleError?.message ||
          ""
        }
      />
      <RoleFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        roles={roles}
        handleAdd={createRole}
        handleEdit={editRole}
        submitting={createRoleLoading || editRoleLoading || deleteRoleLoading}
      />
    </>
  );
}
