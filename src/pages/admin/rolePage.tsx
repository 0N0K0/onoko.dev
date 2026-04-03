import { useState } from "react";
import EntitiesPage from "../../components/entities/EntitiesPage";
import useRoleMutations from "../../hooks/mutations/useRoleMutations";
import { ROLES_QUERY } from "../../services/role/roleQueries";
import RoleFormDialog from "../../components/entities/RoleFormDialog";
import { useRole } from "../../hooks/useRole";

/**
 * Page d'administration pour la gestion des rôles
 * Affiche une liste des rôles existants et permet d'ajouter, modifier ou supprimer des rôles
 */
export default function Roles() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const { roles, setRoles } = useRole();

  const { handleAdd, handleEdit, handleDelete } = useRoleMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    roles,
    setRoles,
  });

  return (
    <>
      <EntitiesPage
        labels={{
          title: "Rôles",
          addButton: "Ajouter un rôle",
          entity: "roles",
        }}
        items={roles}
        setItems={setRoles}
        query={ROLES_QUERY}
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
          delete: handleDelete,
        }}
        submitting={submitting}
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        submitError={submitError}
      />
      <RoleFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        roles={roles}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        submitting={submitting}
      />
    </>
  );
}
