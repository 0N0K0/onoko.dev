import EntitiesContent from "../../layout/admin/EntitiesContent";
import useRoleMutations from "../../hooks/mutations/useRoleMutations";
import RoleFormDialog from "../../components/entities/RoleFormDialog";
import useRoles from "../../hooks/queries/useRoles";
import useEntityPage from "../../hooks/useEntityPage";
import { stripHtml } from "../../utils/stringUtils";

export default function Roles() {
  const { roles, loading, error, refetch } = useRoles();
  const mutations = useRoleMutations();
  const { contentProps, formDialogProps } = useEntityPage({
    query: { loading, error, refetch },
    mutations,
    messages: {
      create: "Rôle créé avec succès",
      edit: "Rôle modifié avec succès",
      delete: "Rôle supprimé avec succès",
    },
  });

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
            content: (item) => stripHtml(item.label),
          },
        ]}
        {...contentProps}
      />
      <RoleFormDialog {...formDialogProps} roles={roles} />
    </>
  );
}
