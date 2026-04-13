import { Button } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";

/**
 * Composant de dialogue pour l'édition en masse d'entités.
 * Ce composant affiche un dialogue personnalisé avec un titre, un contenu et des actions (boutons) pour valider ou annuler les modifications.
 * Il est conçu pour être réutilisé dans différents contextes d'édition en masse, en permettant de personnaliser le contenu et les actions selon les besoins spécifiques de chaque cas d'utilisation.
 * @param {Object} props Les propriétés du composant.
 * @param {boolean} props.open Indique si le dialogue est ouvert ou fermé.
 * @param {function} props.setOpen Fonction pour changer l'état d'ouverture du dialogue.
 * @param {string} props.title Le titre à afficher dans le dialogue.
 * @param {React.ReactNode} props.content Le contenu à afficher dans le dialogue, qui peut être n'importe quel élément React.
 * @param {boolean} props.disabled Indique si les actions du dialogue sont désactivées ou non.
 * @param {function} props.onClick Fonction à appeler lorsque l'utilisateur clique sur le bouton de validation.
 * @param {number} [props.width=4] La largeur du dialogue, exprimée en nombre de colonnes (par défaut à 4).
 */
export default function BulkEditFormDialog({
  open,
  setOpen,
  title,
  content,
  disabled,
  onClick,
  width = 4,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  content: React.ReactNode;
  disabled: boolean;
  onClick: () => void;
  width?: number;
}) {
  return (
    <CustomDialog
      open={open}
      onClose={() => setOpen(false)}
      title={title}
      content={content}
      actions={[
        <Button
          key="cancel"
          onClick={() => {
            setOpen(false);
          }}
          disabled={disabled}
          startIcon={<Icon path={mdiClose} size={1} />}
        >
          Annuler
        </Button>,
        <Button
          key="confirm"
          color="success"
          onClick={() => {
            onClick();
            setOpen(false);
          }}
          disabled={disabled}
          startIcon={<Icon path={mdiCheck} size={1} />}
        >
          Valider
        </Button>,
      ]}
      width={width}
    />
  );
}
