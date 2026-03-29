import { TextField, Button } from "@mui/material";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";
import ResponsiveTitle from "../../components/custom/responsiveTitle";
import { Link as RouterLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../../constants/apiConstants";
import apolloClient from "../../services/appolloClient";
import { REQUEST_PASSWORD_RESET_MUTATION } from "../../services/accountMutations";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CustomSnackbar from "../../components/custom/customSnackBar";
import ClosableSnackbar from "../../components/custom/closableSnackbar";
import AuthLayout from "../../layout/auth/authLayout";

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
  const handleSubmit = async (e: React.SubmitEvent) => {
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
    <AuthLayout component="form" onSubmit={handleSubmit}>
      {submitError && (
        <CustomSnackbar open={true} message={submitError} severity="error" />
      )}
      <ClosableSnackbar
        open={successSnackbarOpen}
        setOpen={setSuccessSnackbarOpen}
        message="Si l'adresse existe, un e-mail de réinitialisation a été envoyé."
        severity="success"
      />
      <ResponsiveTitle
        variant="h5"
        textAlign="center"
        component="h1"
        width="100%"
      >
        Demander la&nbsp;réinitialisation
        de&nbsp;mon&nbsp;mot&nbsp;de&nbsp;passe
      </ResponsiveTitle>
      <ResponsiveStack rowGap={3} width="100%">
        <TextField
          label="Adresse e-mail"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={submitting}
          autoComplete="email"
        />
      </ResponsiveStack>
      <ResponsiveStack rowGap={3} width="100%" alignItems="end">
        <ResponsiveStack direction="row" rowGap={2} columnGap={2} width="100%">
          <Button
            variant="text"
            color="primary"
            fullWidth
            component={RouterLink}
            to={`../${LOGIN_ROUTE}`}
          >
            Revenir à
            {isAuthenticated ? (
              <>&nbsp;l'espace administrateur</>
            ) : (
              <>&nbsp;la&nbsp;page de&nbsp;connexion</>
            )}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            disabled={submitting || !email}
          >
            {submitting ? "Envoi..." : "Envoyer"}
          </Button>
        </ResponsiveStack>
      </ResponsiveStack>
    </AuthLayout>
  );
}
