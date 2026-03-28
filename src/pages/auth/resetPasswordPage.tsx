import { Alert, Button, Snackbar, useTheme } from "@mui/material";
import {
  ResponsivePaper,
  ResponsiveStack,
} from "../../components/ResponsiveLayout";
import ResponsiveTitle from "../../components/responsiveTitle";
import RootPaper from "../../layout/rootPaper";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import NewPasswordFields from "../../components/newPasswordFields";
import { Link as RouterLink } from "react-router-dom";
import { API_URL, LOGIN_ROUTE } from "../../constants/apiConstants";
import { useAuth } from "../../hooks/useAuth";
import ClosableSnackbar from "../../components/closableSnackbar";
import CustomSnackbar from "../../components/customSnackBar";

/**
 * Page de réinitialisation du mot de passe. Permet aux utilisateurs de réinitialiser leur mot de passe en fournissant un nouveau mot de passe et une confirmation, après avoir cliqué sur le lien de réinitialisation reçu par e-mail.
 * Gère la validation des champs, l'envoi de la requête de réinitialisation au backend et l'affichage des messages de succès ou d'erreur.
 */
export default function ResetPassword() {
  const theme = useTheme();

  const { isAuthenticated } = useAuth();
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
      const res = await fetch(`${API_URL}/auth/reset/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(
          data.message || "Échec de la réinitialisation du mot de passe",
        );
      }
      setSubmitSuccess(true);
    } catch (e: any) {
      setSubmitError(e.message || "Erreur inconnue");
      setSubmitSuccess(false);
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
        open={submitSuccess}
        setOpen={setSubmitSuccess}
        message="Votre mot de passe a été réinitialisé avec succès."
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
          Réinitialiser mon&nbsp;mot&nbsp;de&nbsp;passe
        </ResponsiveTitle>
        <ResponsiveStack rowGap={3} width="100%">
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
              disabled={
                submitting || !!newPasswordError || !!confirmPasswordError
              }
            >
              {submitting ? "Réinitialisation..." : "Réinitialiser"}
            </Button>
          </ResponsiveStack>
        </ResponsiveStack>
      </ResponsivePaper>
    </RootPaper>
  );
}
