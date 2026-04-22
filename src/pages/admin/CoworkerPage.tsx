import EntitiesContent from "../../layout/admin/EntitiesContent";
import useCoworkerMutations from "../../hooks/mutations/useCoworkerMutations";
import CoworkerFormDialog from "../../components/entities/CoworkerFormDialog";
import type { Role } from "../../types/entities/roleTypes";
import useCoworkers from "../../hooks/queries/useCoworkers";
import useEntityPage from "../../hooks/useEntityPage";

export default function Coworkers() {
  const { coworkers, loading, error, refetch } = useCoworkers();
  const mutations = useCoworkerMutations();
  const { contentProps, formDialogProps } = useEntityPage({
    query: { loading, error, refetch },
    mutations,
    messages: {
      create: "Intervenant créé avec succès",
      edit: "Intervenant modifié avec succès",
      delete: "Intervenant supprimé avec succès",
    },
  });

  return (
    <>
      <EntitiesContent
        labels={{
          title: "Intervenants",
          addButton: "Ajouter un intervenant",
          entity: "coworkers",
        }}
        items={coworkers}
        loading={loading}
        fields={[
          {
            key: "name",
            label: "Nom",
          },
          {
            key: "roles",
            label: "Rôles",
            content: (item) =>
              item.roles?.map((role: Role) => role.label).join(", "),
          },
        ]}
        {...contentProps}
      />
      <CoworkerFormDialog {...formDialogProps} coworkers={coworkers} />
    </>
  );
}
