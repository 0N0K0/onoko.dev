import { TextField } from "@mui/material";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";
import apolloClient from "../../services/appolloClient";
import { REQUEST_PASSWORD_RESET_MUTATION } from "../../services/account/accountMutations";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import SnackbarAlert from "../../components/custom/snackbarAlert";
import ClosableSnackbarAlert from "../../components/custom/closableSnackbarAlert";
import AuthLayout from "../../layout/auth/authLayout";
import { LOGIN_ROUTE } from "../../constants/apiConstants";

/**
 * Page de demande de réinitialisation du mot de passe.
 * Permet aux utilisateurs de demander un lien de réinitialisation en fournissant leur adresse e-mail.
 */
export default function RequestResetPassword() {
  const { isAuthenticated } = useAuth();

  const [email, setEmail] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);

  // Gère la soumission du formulaire de réinitialisation, en envoyant une requête au backend avec le token et le nouveau mot de passe, et en gérant les réponses pour afficher les messages appropriés.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      await apolloClient.mutate({
        mutation: REQUEST_PASSWORD_RESET_MUTATION,
        variables: { email },
      });
      setSuccessSnackbarOpen(true);
    } catch (e: any) {
      setSubmitError(e.message || "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Demander la&nbsp;réinitialisation de&nbsp;mon&nbsp;mot&nbsp;de&nbsp;passe"
      onSubmit={handleSubmit}
      returnButton={{
        to: `../${LOGIN_ROUTE}`,
        text: `Revenir à ${isAuthenticated ? "l'espace administrateur" : "la page de connexion"}`,
        disabled: submitting,
      }}
      submitButton={{
        text: `${submitting ? "Envoi..." : "Envoyer"}`,
        disabled: submitting || !email,
      }}
    >
      {submitError && (
        <SnackbarAlert open={true} message={submitError} severity="error" />
      )}
      <ClosableSnackbarAlert
        open={successSnackbarOpen}
        setOpen={setSuccessSnackbarOpen}
        message="Si l'adresse existe, un e-mail de réinitialisation a été envoyé."
        severity="success"
      />
      <ResponsiveStack rowGap={3} width="100%">
        <TextField
          label="Adresse e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={submitting}
          autoComplete="email"
        />
      </ResponsiveStack>
    </AuthLayout>
  );
}
