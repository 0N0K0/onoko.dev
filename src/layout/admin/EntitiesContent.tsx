import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import ResponsiveTitle from "../../components/custom/ResponsiveTitle";
import { Button, CircularProgress } from "@mui/material";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import CustomTable from "../../components/custom/CustomTable";
import ClosableSnackbarAlert from "../../components/custom/ClosableSnackbarAlert";
import SnackbarAlert from "../../components/custom/SnackbarAlert";
import type { EntitiesContentProps } from "../../types/entities/entityTypes";

/**
 * Composant de page générique pour afficher une liste d'entités avec des actions d'ajout, de modification et de suppression
 * Utilise une requête GraphQL pour récupérer les données et gère les états de chargement, d'erreur et de succès
 * @param {{
 *           entity: string;
 *           title: string;
 *           addButton: string;
 *         }} props.labels Labels pour l'entité, le titre de la page et le bouton d'ajout
 * @param {any[]} props.items Liste des items à afficher dans la table
 * @param {DocumentNode} props.query Requête GraphQL pour récupérer les items
 * @param {{
 *           key: string;
 *           label: string;
 *           content?: (item: any) => React.ReactNode;
 *         }[]} props.fields Liste des champs à afficher dans la table, avec une clé, un label et éventuellement une fonction de rendu personnalisée
 * @param {{
 *           add: () => void;
 *           edit: (id: string) => void;
 *           delete: (selectedItems: string[]) => void;
 *         }} props.onClickActions Fonctions à appeler lors des actions d'ajout, de modification et de suppression
 * @param {boolean} props.submitting Indique si une action est en cours de soumission (pour désactiver les boutons)
 * @param {string} props.submitSuccess Message de succès à afficher dans une alerte après une action réussie
 * @param {function} props.setSubmitSuccess Fonction pour définir le message de succès
 * @param {string} props.error Message d'erreur à afficher dans une alerte après une action échouée
 */
export default function EntitiesContent({
  labels,
  items,
  loading,
  fields,
  onClickActions,
  submitting,
  submitSuccess,
  setSubmitSuccess,
  error,
}: EntitiesContentProps) {
  return (
    <>
      <ResponsiveStack
        direction="row"
        rowGap={3}
        columnGap={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        flexWrap="wrap"
        maxWidth="100% !important"
      >
        <ResponsiveTitle variant="h1">{labels.title}</ResponsiveTitle>
        {!items || items.length === 0 ? (
          <Button
            onClick={() => onClickActions.add()}
            startIcon={<Icon path={mdiPlus} size={1} />}
            sx={{ marginLeft: "auto" }}
          >
            {labels.addButton}
          </Button>
        ) : null}
      </ResponsiveStack>
      {loading ? (
        <CircularProgress />
      ) : (
        items &&
        items.length > 0 && (
          <CustomTable
            fields={fields}
            items={items}
            canSelect
            onClickAdd={() => onClickActions.add()}
            onClickEdit={onClickActions.edit}
            onClickDelete={(selectedItems: string[]) => {
              for (const id of selectedItems) {
                onClickActions.delete({ variables: { id } });
              }
            }}
            submitting={submitting}
          />
        )
      )}
      <ClosableSnackbarAlert
        open={!!submitSuccess}
        setOpen={() => setSubmitSuccess("")}
        message={submitSuccess}
        severity="success"
      />
      <SnackbarAlert
        open={!!error}
        message={error || "Une erreur est survenue"}
        severity="error"
      />
    </>
  );
}
