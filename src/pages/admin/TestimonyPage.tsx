import EntitiesContent from "../../layout/admin/EntitiesContent";
import useTestimonyMutations from "../../hooks/mutations/useTestimonyMutations";
import TestimonyFormDialog from "../../components/entities/TestimonyFormDialog";
import useTestimonies from "../../hooks/queries/useTestimonies";
import useEntityPage from "../../hooks/useEntityPage";
import { stripHtml } from "../../utils/stringUtils";

export default function Testimonies() {
  const { testimonies, loading, error, refetch } = useTestimonies();
  const mutations = useTestimonyMutations();
  const { contentProps, formDialogProps } = useEntityPage({
    query: { loading, error, refetch },
    mutations,
    messages: {
      create: "Témoignage créé avec succès",
      edit: "Témoignage modifié avec succès",
      delete: "Témoignage supprimé avec succès",
    },
  });

  return (
    <>
      <EntitiesContent
        labels={{
          title: "Témoignages",
          addButton: "Ajouter un témoignage",
          entity: "testimonies",
        }}
        items={testimonies}
        loading={loading}
        fields={[
          {
            key: "name",
            label: "Nom",
            content: (item) => stripHtml(item.name || ""),
          },
          {
            key: "company",
            label: "Entité",
            content: (item) => stripHtml(item.company || ""),
          },
          {
            key: "createdAt",
            label: "Date",
            content: (item) =>
              item.createdAt ? item.createdAt.format("MM/YYYY") : "",
          },
        ]}
        {...contentProps}
      />
      <TestimonyFormDialog {...formDialogProps} testimonies={testimonies} />
    </>
  );
}
