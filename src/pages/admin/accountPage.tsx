import { Button, Link, TextField } from "@mui/material";
import ResponsiveTitle from "../../components/responsiveTitle";
import { useState, useEffect } from "react";
import { ResponsiveStack } from "../../components/ResponsiveLayout";
import ResponsiveBodyTypography from "../../components/responsiveBodyTypography";
import PasswordField from "../../components/passwordField";

export default function Account() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [initialUser, setInitialUser] = useState<{login: string; email: string} | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [userError, setUserError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState<boolean|null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

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

  const handleCurrentPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    const validationMsg = validatePassword(value);
    setNewPasswordError(validationMsg);
    if (value !== confirmPassword) {
      setPasswordError("Les mots de passe doivent être identiques.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    if (newPassword && e.target.value !== newPassword) {
      setPasswordError("Les mots de passe doivent être identiques.");
    } else {
      setPasswordError("");
    }
  };

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
    <ResponsiveStack rowGap={6} width="100%" alignItems="end">
      <ResponsiveTitle variant="h1" width="100%">
        Mon compte
      </ResponsiveTitle>
      {loadingUser ? (
        <div style={{ width: "100%", textAlign: "center", margin: "2em 0" }}>
          Chargement...
        </div>
      ) : userError ? (
        <div
          style={{
            color: "red",
            width: "100%",
            textAlign: "center",
            margin: "2em 0",
          }}
        >
          {userError}
        </div>
      ) : (
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
                  !!(initialUser && (login !== initialUser.login ||
                    email !== initialUser.email ||
                    newPassword !== "" ||
                    confirmPassword !== "") &&
                    !currentPassword)
                }
                errorText="Le mot de passe est obligatoire pour valider les changements."
              />
              <ResponsiveBodyTypography variant="bodyXs">
                Mot de passe oublié ?{" "}
                <Link href="/reset-password">
                  Réinitialiser mon mot de passe
                </Link>
              </ResponsiveBodyTypography>
            </ResponsiveStack>
            <ResponsiveStack rowGap={3} width="100%">
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
                error={!!passwordError}
                errorText={passwordError}
              />
            </ResponsiveStack>
          </ResponsiveStack>
        </ResponsiveStack>
      )}
      {submitError && (
        <div style={{ color: "red", marginTop: 16 }}>{submitError}</div>
      )}
      {submitSuccess && (
        <div style={{ color: "green", marginTop: 16 }}>Mise à jour réussie !</div>
      )}
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ mt: 3, width: "fit-content" }}
        disabled={!!(
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
        )}
      >
        {submitting ? "Envoi..." : "Valider"}
      </Button>
    </ResponsiveStack>
  );
}
