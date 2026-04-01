import { Button, CircularProgress, Container, TextField } from "@mui/material";
import ResponsiveTitle from "../../components/custom/responsiveTitle";
import { useState, useEffect } from "react";
import apolloClient from "../../services/appolloClient";
import { ACCOUNT_QUERY } from "../../services/accountQueries";
import { UPDATE_ACCOUNT_MUTATION } from "../../services/accountMutations";
import { ResponsiveStack } from "../../components/custom/responsiveLayout";
import PasswordField from "../../components/custom/passwordField";
import ResetPasswordLink from "../../components/account/resetPasswordLink";
import NewPasswordFields from "../../components/account/newPasswordFields";
import ClosableSnackbar from "../../components/custom/closableSnackbar";
import CustomSnackbar from "../../components/custom/customSnackBar";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";

/**
 * Page de gestion du compte utilisateur dans l'espace admin.
 * Permet de voir et modifier le login, l'email et le mot de passe du compte.
 */
export default function Account() {
  const containerMaxWidth = {
    xs: useResponsiveWidth(6),
    xl: useResponsiveWidth(8),
  };
  const [loadingUser, setLoadingUser] = useState(true);
  const [initialUser, setInitialUser] = useState<{
    login: string;
    email: string;
  } | null>(null);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [userError, setUserError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean | null>(null);
  const [submitError, setSubmitError] = useState("");

  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);

  const fetchUserInfo = async () => {
    setLoadingUser(true);
    setUserError("");
    try {
      const { data } = await apolloClient.query<{
        account: { login: string; email: string };
      }>({
        query: ACCOUNT_QUERY,
        fetchPolicy: "no-cache",
      });
      if (!data || !data.account)
        throw new Error("Erreur lors de la récupération du compte");
      setLogin(data.account.login || "");
      setEmail(data.account.email || "");
      setInitialUser({
        login: data.account.login || "",
        email: data.account.email || "",
      });
    } catch (e: any) {
      setUserError(e.message || "Erreur inconnue");
    } finally {
      setLoadingUser(false);
    }
  };

  // Récupération des informations du compte à l'affichage de la page, avec gestion du chargement et des erreurs.
  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Gestion des changements du mot de passe actuel pour valider les changements de compte.
  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(e.target.value);
  };

  // Gestion de la soumission du formulaire de mise à jour du compte, avec validation et affichage des erreurs/succès.
  const handleSubmit = async () => {
    setSubmitError("");
    setSubmitSuccess(null);
    setSubmitting(true);
    try {
      if (!initialUser) throw new Error("Utilisateur non chargé");
      const variables: any = { oldPassword: currentPassword };
      if (login !== initialUser.login) variables.login = login;
      if (email !== initialUser.email) variables.email = email;
      if (newPassword) variables.newPassword = newPassword;
      const { data } = await apolloClient.mutate<{
        updateAccount: { login: string; email: string };
      }>({
        mutation: UPDATE_ACCOUNT_MUTATION,
        variables,
      });
      if (!data || !data.updateAccount) {
        throw new Error("Échec de la mise à jour");
      }
      setSubmitSuccess(true);
      // Mettre à jour l'état initial pour refléter les nouvelles valeurs retournées
      setInitialUser({
        login: data.updateAccount.login,
        email: data.updateAccount.email,
      });
      setLogin(data.updateAccount.login);
      setEmail(data.updateAccount.email);
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (e: any) {
      setSubmitError(e.message || "Une erreur est survenue");
      setSubmitSuccess(false);
    } finally {
      setSubmitting(false);
    }
  };

  // Affichage des snackbars de succès ou d'erreur en fonction des résultats des actions de mise à jour du compte ou de récupération des informations, avec gestion de l'ouverture et de la fermeture.
  useEffect(() => {
    if (submitSuccess) setSuccessSnackbarOpen(true);
    if (userError || submitError) setErrorSnackbarOpen(true);
  }, [submitSuccess, userError, submitError]);

  return (
    <>
      <ResponsiveTitle variant="h1" width="100%">
        Mon compte
      </ResponsiveTitle>
      <ClosableSnackbar
        open={successSnackbarOpen}
        setOpen={setSuccessSnackbarOpen}
        message="Les informations du compte ont été mises à jour avec succès."
        severity="success"
      />
      <CustomSnackbar
        open={errorSnackbarOpen}
        message={userError || submitError || "Une erreur est survenue"}
        severity="error"
      />
      {loadingUser ? (
        <CircularProgress />
      ) : (
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            maxWidth: containerMaxWidth,
            padding: "24px 0px 0px !important",
            height: "100%",
            overflowY: "auto",
          }}
          component="form"
        >
          <ResponsiveStack rowGap={3} width="100%">
            <ResponsiveStack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
              }}
              rowGap={3}
              columnGap={2}
              width="100%"
            >
              <TextField
                label="Nom d'utilisateur"
                fullWidth
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                autoComplete="username"
              />
              <TextField
                label="Adresse e-mail"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </ResponsiveStack>

            <ResponsiveStack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
              }}
              rowGap={3}
              columnGap={2}
              width="100%"
            >
              <ResponsiveStack width="100%" alignItems="end">
                <PasswordField
                  label="Mot de passe actuel"
                  value={currentPassword}
                  onChange={handleCurrentPasswordChange}
                  error={
                    !!(
                      initialUser &&
                      (login !== initialUser.login ||
                        email !== initialUser.email ||
                        newPassword !== "" ||
                        confirmPassword !== "") &&
                      !currentPassword
                    )
                  }
                  required
                  errorText="Le mot de passe est obligatoire pour valider les changements."
                  autoComplete="password"
                />
                <ResetPasswordLink />
              </ResponsiveStack>
              <ResponsiveStack rowGap={3} width="100%">
                <NewPasswordFields
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                  confirmPassword={confirmPassword}
                  setConfirmPassword={setConfirmPassword}
                  newPasswordError={newPasswordError}
                  setNewPasswordError={setNewPasswordError}
                  confirmPasswordError={passwordError}
                  setConfirmPasswordError={setPasswordError}
                />
              </ResponsiveStack>
            </ResponsiveStack>
          </ResponsiveStack>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={
              !!(
                submitting ||
                (initialUser &&
                  login === initialUser.login &&
                  email === initialUser.email &&
                  newPassword === "" &&
                  confirmPassword === "") ||
                passwordError ||
                newPasswordError ||
                (initialUser &&
                  (login !== initialUser.login ||
                    email !== initialUser.email ||
                    newPassword !== "" ||
                    confirmPassword !== "") &&
                  !currentPassword)
              )
            }
            sx={{ alignSelf: "flex-end" }}
          >
            {submitting ? "Envoi..." : "Valider"}
          </Button>
        </Container>
      )}
    </>
  );
}
