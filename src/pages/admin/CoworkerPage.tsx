import { useEffect, useState } from "react";
import EntitiesContent from "../../layout/admin/EntitiesContent";
import useCoworkerMutations from "../../hooks/mutations/useCoworkerMutations";
import CoworkerFormDialog from "../../components/entities/CoworkerFormDialog";
import type { Role } from "../../types/entities/roleTypes";
import useCoworkers from "../../hooks/queries/useCoworkers";

/**
 * Page d'administration pour la gestion des intervenants
 * Affiche une liste des intervenants existants et permet d'ajouter, modifier ou supprimer des intervenants
 */
export default function Coworkers() {
  const [submitSuccess, setSubmitSuccess] = useState("");

  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const { coworkers, loading, error, refetch } = useCoworkers();

  const {
    createCoworker,
    createCoworkerData,
    createCoworkerLoading,
    createCoworkerError,
    editCoworker,
    editCoworkerData,
    editCoworkerLoading,
    editCoworkerError,
    deleteCoworker,
    deleteCoworkerData,
    deleteCoworkerLoading,
    deleteCoworkerError,
  } = useCoworkerMutations();

  useEffect(() => {
    if (!createCoworkerLoading && createCoworkerData) {
      setSubmitSuccess("Intervenant créé avec succès");
      setFormDialogOpen(false);
      refetch();
    }
  }, [createCoworkerData]);
  useEffect(() => {
    if (!editCoworkerLoading && editCoworkerData) {
      setSubmitSuccess("Intervenant modifié avec succès");
      setFormDialogOpen(false);
      refetch();
    }
  }, [editCoworkerData]);
  useEffect(() => {
    if (!deleteCoworkerLoading && deleteCoworkerData) {
      setSubmitSuccess("Intervenant supprimé avec succès");
      refetch();
    }
  }, [deleteCoworkerData]);

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
        onClickActions={{
          add: () => setFormDialogOpen(true),
          edit: (id: string) => setFormDialogOpen(id),
          delete: deleteCoworker,
        }}
        submitting={
          createCoworkerLoading || editCoworkerLoading || deleteCoworkerLoading
        }
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        error={
          error?.message ||
          createCoworkerError?.message ||
          editCoworkerError?.message ||
          deleteCoworkerError?.message ||
          ""
        }
      />
      <CoworkerFormDialog
        open={formDialogOpen}
        setOpen={setFormDialogOpen}
        coworkers={coworkers}
        handleAdd={createCoworker}
        handleEdit={editCoworker}
        submitting={
          createCoworkerLoading || editCoworkerLoading || deleteCoworkerLoading
        }
      />
    </>
  );
}
