import { type SnackbarCloseReason } from "@mui/material";
import SnackbarAlert from "./snackbarAlert";
import type { ClosableSnackbarAlertProps } from "../../types/baseComponent";

/**
 * Composant de snackbar personnalisée avec possibilité de fermeture manuelle ou automatique.
 * Permet d'afficher des messages de succès, d'erreur, d'avertissement ou d'information à l'utilisateur, avec une gestion intégrée de l'ouverture et de la fermeture du snackbar.
 * Utilise le composant SnackbarAlert pour afficher le message avec le style approprié en fonction de la gravité du message.
 * @param {boolean} props.open Indique si le snackbar est ouvert ou fermé.
 * @param {function} props.setOpen Fonction pour mettre à jour l'état d'ouverture du snackbar.
 * @param {string} props.message Le message à afficher dans le snackbar.
 * @param {function} props.onClose Fonction optionnelle à appeler lors de la fermeture du snackbar.
 * @param {"success" | "error" | "warning" | "info"} props.severity La gravité du message, qui détermine le style du snackbar.
 * @param {number} props.autohideDuration Durée en millisecondes avant que le snackbar ne se ferme automatiquement. Par défaut, 6000 ms (6 secondes).
 */
export default function ClosableSnackbarAlert({
  open,
  setOpen,
  message,
  onClose,
  severity,
  autohideDuration = 6000,
}: ClosableSnackbarAlertProps) {
  // Fonction de gestion de la fermeture du snackbar, qui peut être déclenchée manuellement ou automatiquement, et qui ignore les fermetures dues à un clic à l'extérieur du snackbar (clickaway).
  const handleClose = (
    _: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <SnackbarAlert
      open={open}
      message={message}
      severity={severity}
      onClose={onClose || handleClose}
      autohideDuration={autohideDuration}
    />
  );
}
