import { Alert, Snackbar } from "@mui/material";
import type { CustomSnackbarProps } from "../../types/baseComponent";

/**
 * Composant de snackbar personnalisée pour afficher des messages de succès, d'erreur, d'avertissement ou d'information à l'utilisateur.
 * Utilise les composants Snackbar et Alert de Material-UI pour afficher le message avec le style approprié en fonction de la gravité du message.
 * Permet de personnaliser le message, la gravité, la durée d'affichage et la fonction de fermeture du snackbar.
 * @param {boolean} props.open Indique si le snackbar est ouvert ou fermé.
 * @param {string} props.message Le message à afficher dans le snackbar.
 * @param {"success" | "error" | "warning" | "info"} props.severity La gravité du message, qui détermine le style du snackbar.
 * @param {function} props.onClose Fonction optionnelle à appeler lors de la fermeture du snackbar.
 * @param {number} props.autohideDuration Durée en millisecondes avant que le snackbar ne se ferme automatiquement. Par défaut, 6000 ms (6 secondes).
 */
export default function CustomSnackbar({
  open,
  message,
  severity,
  onClose,
  autohideDuration,
}: CustomSnackbarProps) {
  return (
    <Snackbar open={open} autoHideDuration={autohideDuration} onClose={onClose}>
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
}
