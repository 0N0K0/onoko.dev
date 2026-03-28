import { Button, CircularProgress, Container, TextField } from "@mui/material";
import ResponsiveTitle from "../../components/responsiveTitle";
import { useState, useEffect } from "react";
import { ResponsiveStack } from "../../components/ResponsiveLayout";
import PasswordField from "../../components/passwordField";
import ResetPasswordLink from "../../components/resetPasswordLink";
import NewPasswordFields from "../../components/newPasswordFields";
import ClosableSnackbar from "../../components/closableSnackbar";
import CustomSnackbar from "../../components/customSnackBar";

/**
 * Page de gestion du compte utilisateur dans l'espace admin.
 * Permet de voir et modifier le login, l'email et le mot de passe du compte.
 */
export default function Account() {
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

  // Récupération des informations du compte à l'affichage de la page, avec gestion du chargement et des erreurs.
  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoadingUser(true);
      setUserError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token manquant");
        const res = await fetch("http://localhost:4000/account", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok)
          throw new Error("Erreur lors de la récupération du compte");
        const data = await res.json();
        setLogin(data.login || "");
        setEmail(data.email || "");
        setInitialUser({ login: data.login || "", email: data.email || "" });
      } catch (e: any) {
        setUserError(e.message || "Erreur inconnue");
      } finally {
        setLoadingUser(false);
      }
    };
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
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token manquant");
      const payload: any = { oldPassword: currentPassword };
      if (login !== initialUser.login) payload.login = login;
      if (email !== initialUser.email) payload.email = email;
      if (newPassword) payload.newPassword = newPassword;
      const res = await fetch("http://localhost:4000/account", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Échec de la mise à jour");
      }
      setSubmitSuccess(true);
      // Mettre à jour l'état initial pour refléter les nouvelles valeurs
      setInitialUser({ login, email });
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (e: any) {
      setSubmitError(e.message || "Erreur inconnue");
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
        message={userError || submitError || "Erreur inconnue"}
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
            maxWidth: "calc((100% - 15 * 16px) / 12 * 4 + 5 * 16px)",
          }}
          component="form"
        >
          <ResponsiveStack rowGap={3} width="100%">
            <ResponsiveStack
              direction="row"
              rowGap={2}
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
              direction="row"
              rowGap={2}
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
