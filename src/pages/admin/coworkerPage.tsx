import { useState } from "react";
import EntitiesPage from "../../components/entities/EntitiesPage";
import useCoworkerMutations from "../../hooks/useCoworkerMutations";
import { COWORKERS_QUERY } from "../../services/coworker/coworkerQueries";
import CoworkerFormDialog from "../../components/entities/CoworkerFormDialog";
import type { Coworker } from "../../types/cowokerTypes";
import type { Role } from "../../types/roleTypes";

/**
 * Page d'administration pour la gestion des intervenants
 * Affiche une liste des intervenants existants et permet d'ajouter, modifier ou supprimer des intervenants
 */
export default function Coworkers() {
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const [coworkers, setCoworkers] = useState<Coworker[] | undefined>(undefined);

  const { handleAdd, handleEdit, handleDelete } = useCoworkerMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setFormDialogOpen,
    coworkers,
    setCoworkers,
  });

  return (
    <>
      <EntitiesPage
        labels={{
          title: "Intervenants",
          addButton: "Ajouter un intervenant",
          entity: "coworkers",
        }}
        items={coworkers}
        setItems={setCoworkers}
        query={COWORKERS_QUERY}
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
      <CoworkerFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        coworkers={coworkers}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        submitting={submitting}
      />
    </>
  );
}
