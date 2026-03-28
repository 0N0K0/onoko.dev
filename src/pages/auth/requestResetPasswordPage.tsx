import { TextField, Button, useTheme } from "@mui/material";
import {
  ResponsivePaper,
  ResponsiveStack,
} from "../../components/ResponsiveLayout";
import RootPaper from "../../layout/rootPaper";
import ResponsiveTitle from "../../components/responsiveTitle";
import { Link as RouterLink } from "react-router-dom";
import { API_URL, LOGIN_ROUTE } from "../../constants/apiConstants";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import CustomSnackbar from "../../components/customSnackBar";
import ClosableSnackbar from "../../components/closableSnackbar";

/**
 * Page de demande de réinitialisation du mot de passe.
 * Permet aux utilisateurs de demander un lien de réinitialisation en fournissant leur adresse e-mail.
 */
export default function RequestResetPassword() {
  const theme = useTheme();

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
      const res = await fetch(`${API_URL}/auth/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Échec de la demande de réinitialisation",
        );
      }
      setSuccessSnackbarOpen(true);
    } catch (e: any) {
      setSubmitError(e.message || "Erreur inconnue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <RootPaper
      sx={{
        alignItems: "center",
        justifyContent: "center !important",
      }}
    >
      {submitError && (
        <CustomSnackbar open={true} message={submitError} severity="error" />
      )}
      <ClosableSnackbar
        open={successSnackbarOpen}
        setOpen={setSuccessSnackbarOpen}
        message="Si l'adresse existe, un e-mail de réinitialisation a été envoyé."
        severity="success"
      />
      <ResponsivePaper
        component="form"
        onSubmit={handleSubmit}
        paddingY={3}
        rowGap={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingX: 4,
          maxWidth: theme.breakpoints.values.md,
        }}
        elevation={1}
      >
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
          <ResponsiveStack
            direction="row"
            rowGap={2}
            columnGap={2}
            width="100%"
          >
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
      </ResponsivePaper>
    </RootPaper>
  );
}
