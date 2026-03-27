import type { NewPasswordFieldsProps } from "../types/baseComponent";
import PasswordField from "./passwordField";

/**
 * Composant pour les champs de saisie du nouveau mot de passe et de sa confirmation.
 * Gère la validation du mot de passe et l'affichage des erreurs associées.
 * @param props.newPassword Le mot de passe saisi par l'utilisateur.
 * @param props.setNewPassword Fonction pour mettre à jour le mot de passe saisi.
 * @param props.confirmPassword Le mot de passe de confirmation saisi par l'utilisateur.
 * @param props.setConfirmPassword Fonction pour mettre à jour le mot de passe de confirmation.
 * @param props.newPasswordError Message d'erreur lié au mot de passe saisi.
 * @param props.setNewPasswordError Fonction pour mettre à jour le message d'erreur du mot de passe.
 * @param props.confirmPasswordError Message d'erreur lié au mot de passe de confirmation.
 * @param props.setConfirmPasswordError Fonction pour mettre à jour le message d'erreur du mot de passe de confirmation.
 */
export default function NewPasswordFields({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  newPasswordError,
  setNewPasswordError,
  confirmPasswordError,
  setConfirmPasswordError,
}: NewPasswordFieldsProps) {
  // Fonction de validation du mot de passe selon les critères définis.
  const validatePassword = (pwd: string) => {
    if (!pwd) return "";
    if (pwd.length < 20) {
      return "Au moins 20 caractères.";
    }
    if (!/[A-Z]/.test(pwd)) {
      return "Au moins une majuscule.";
    }
    if (!/[a-z]/.test(pwd)) {
      return "Au moins une minuscule.";
    }
    if (!/[0-9]/.test(pwd)) {
      return "Au moins un chiffre.";
    }
    if (!/[^A-Za-z0-9]/.test(pwd)) {
      return "Au moins un caractère spécial.";
    }
    return "";
  };

  // Gestion du changement de valeur du champ de nouveau mot de passe, avec validation en temps réel.
  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    const validationMsg = validatePassword(value);
    setNewPasswordError(validationMsg);
    if (value !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe doivent être identiques.");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Gestion du changement de valeur du champ de confirmation du mot de passe, avec validation en temps réel.
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    if (newPassword && e.target.value !== newPassword) {
      setConfirmPasswordError("Les mots de passe doivent être identiques.");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <>
      <PasswordField
        label="Nouveau mot de passe"
        value={newPassword}
        onChange={handleNewPasswordChange}
        error={!!newPasswordError}
        errorText={newPasswordError}
      />
      <PasswordField
        label="Confirmer le nouveau mot de passe"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={!!confirmPasswordError}
        errorText={confirmPasswordError}
      />
    </>
  );
}
