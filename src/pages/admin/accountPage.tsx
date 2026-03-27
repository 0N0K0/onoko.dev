import {
  Button,
  CircularProgress,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import ResponsiveTitle from "../../components/responsiveTitle";
import { useState, useEffect } from "react";
import { ResponsiveStack } from "../../components/ResponsiveLayout";
import PasswordField from "../../components/passwordField";
import ResetPasswordLink from "../../components/resetPasswordLink";
import NewPasswordFields from "../../components/newPasswordFields";

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

  return (
    <ResponsiveStack
      rowGap={6}
      width="100%"
      alignItems={loadingUser ? "center" : "end"}
    >
      <ResponsiveTitle variant="h1" width="100%">
        Mon compte
      </ResponsiveTitle>
      {loadingUser ? <CircularProgress /> : null}
      {userError && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 2 }}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            {userError}
          </Alert>
        </Snackbar>
      )}
      {submitError && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 10 }}
        >
          <Alert severity="error" variant="filled" sx={{ width: "100%" }}>
            {submitError}
          </Alert>
        </Snackbar>
      )}
      {submitSuccess && (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          sx={{ mt: 10 }}
        >
          <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
            Les informations du compte ont été mises à jour avec succès.
          </Alert>
        </Snackbar>
      )}
      {!loadingUser && (
        <>
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
              />
              <TextField
                label="Adresse e-mail"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </ResponsiveStack>

            <ResponsiveStack
              direction="row"
              rowGap={2}
              columnGap={2}
              width="100%"
            >
              <ResponsiveStack rowGap={3} width="100%">
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
            sx={{ mt: 3, width: "fit-content" }}
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
          >
            {submitting ? "Envoi..." : "Valider"}
          </Button>
        </>
      )}
    </ResponsiveStack>
  );
}
