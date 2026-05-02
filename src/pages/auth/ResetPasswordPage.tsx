import { ResponsiveStack } from "../../components/custom/ResponsiveLayout";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import NewPasswordFields from "../../components/account/NewPasswordFields";
import { LOGIN_ROUTE } from "../../constants/apiConstants";
import apolloClient from "../../services/appolloClient";
import { RESET_PASSWORD_MUTATION } from "../../services/account/accountMutations";
import ClosableSnackbarAlert from "../../components/custom/ClosableSnackbarAlert";
import SnackbarAlert from "../../components/custom/SnackbarAlert";
import { useAuthContext } from "../../context/AuthContext";
import AuthForm from "../../layout/auth/AuthForm";

/**
 * Page de réinitialisation du mot de passe. Permet aux utilisateurs de réinitialiser leur mot de passe en fournissant un nouveau mot de passe et une confirmation, après avoir cliqué sur le lien de réinitialisation reçu par e-mail.
 * Gère la validation des champs, l'envoi de la requête de réinitialisation au backend et l'affichage des messages de succès ou d'erreur.
 */
export default function ResetPassword() {
  const { isAuthenticated } = useAuthContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Gère la soumission du formulaire de réinitialisation, en envoyant une requête au backend avec le token et le nouveau mot de passe, et en gérant les réponses pour afficher les messages appropriés.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);
    setSubmitting(true);
    try {
      await apolloClient.mutate({
        mutation: RESET_PASSWORD_MUTATION,
        variables: { token, newPassword },
      });
      setSubmitSuccess(true);
    } catch (e: any) {
      setSubmitError(e.message || "Erreur inconnue");
      setSubmitSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthForm
      title="Réinitialiser mon&nbsp;mot&nbsp;de&nbsp;passe"
      onSubmit={handleSubmit}
      returnButton={{
        to: `../${LOGIN_ROUTE}`,
        text: `Revenir à ${isAuthenticated ? "l'espace administrateur" : "la page de connexion"}`,
        disabled: submitting,
      }}
      submitButton={{
        text: submitting ? "Réinitialisation..." : "Réinitialiser",
        disabled: submitting || !!newPasswordError || !!confirmPasswordError,
      }}
    >
      {submitError && (
        <SnackbarAlert open={true} message={submitError} severity="error" />
      )}
      <ClosableSnackbarAlert
        open={submitSuccess}
        setOpen={setSubmitSuccess}
        message="Votre mot de passe a été réinitialisé avec succès."
        severity="success"
      />
      <ResponsiveStack rowGap={3} sx={{ width: "100%" }}>
        <NewPasswordFields
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          newPasswordError={newPasswordError}
          setNewPasswordError={setNewPasswordError}
          confirmPasswordError={confirmPasswordError}
          setConfirmPasswordError={setConfirmPasswordError}
        />
      </ResponsiveStack>
    </AuthForm>
  );
}
