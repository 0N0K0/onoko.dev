import {
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
} from "@mui/material";
import ResponsiveTitle from "../../components/responsiveTitle";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiEyeOff, mdiEye } from "@mdi/js";
import { ResponsiveStack } from "../../components/ResponsiveLayout";
import ResponsiveBodyTypography from "../../components/responsiveBodyTypography";

export default function Account() {
  const initialLogin = "onoko";
  const initialEmail = "hello@onoko.dev";
  const [login, setLogin] = useState(initialLogin);
  const [email, setEmail] = useState(initialEmail);
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const handleTogglePassword = () => setShowPassword((v) => !v);

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

  const handleSubmit = () => {
    // @TODO: Implémenter la logique de soumission du formulaire (vérification du mot de passe actuel, mise à jour des informations, etc.)
  };

  return (
    <ResponsiveStack rowGap={6} width="100%" alignItems="end">
      <ResponsiveTitle variant="h1" width="100%">
        Mon compte
      </ResponsiveTitle>
      <ResponsiveStack rowGap={3} width="100%">
        <ResponsiveStack direction="row" rowGap={2} columnGap={2} width="100%">
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

        <ResponsiveStack direction="row" rowGap={2} columnGap={2} width="100%">
          <ResponsiveStack rowGap={3} width="100%">
            <TextField
              label="Mot de passe actuel"
              type={showPassword ? "text" : "password"}
              fullWidth
              required
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              error={
                (login !== initialLogin ||
                  email !== initialEmail ||
                  newPassword !== "" ||
                  confirmPassword !== "") &&
                !currentPassword
              }
              helperText={
                (login !== initialLogin ||
                  email !== initialEmail ||
                  newPassword !== "" ||
                  confirmPassword !== "") &&
                !currentPassword
                  ? "Le mot de passe est obligatoire pour valider les changements."
                  : ""
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        aria-label={
                          showPassword
                            ? "Masquer le mot de passe"
                            : "Afficher le mot de passe"
                        }
                      >
                        {showPassword ? (
                          <Icon path={mdiEyeOff} size={1} />
                        ) : (
                          <Icon path={mdiEye} size={1} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <ResponsiveBodyTypography variant="bodyXs">
              Mot de passe oublié ?{" "}
              <Link href="/reset-password">Réinitialiser mon mot de passe</Link>
            </ResponsiveBodyTypography>
          </ResponsiveStack>
          <ResponsiveStack rowGap={3} width="100%">
            <TextField
              label="Nouveau mot de passe"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={newPassword}
              onChange={handleNewPasswordChange}
              error={!!newPasswordError}
              helperText={newPasswordError}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        aria-label={
                          showPassword
                            ? "Masquer le mot de passe"
                            : "Afficher le mot de passe"
                        }
                      >
                        {showPassword ? (
                          <Icon path={mdiEyeOff} size={1} />
                        ) : (
                          <Icon path={mdiEye} size={1} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Confirmer le nouveau mot de passe"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={!!passwordError}
              helperText={passwordError}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        aria-label={
                          showPassword
                            ? "Masquer le mot de passe"
                            : "Afficher le mot de passe"
                        }
                      >
                        {showPassword ? (
                          <Icon path={mdiEyeOff} size={1} />
                        ) : (
                          <Icon path={mdiEye} size={1} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </ResponsiveStack>
        </ResponsiveStack>
      </ResponsiveStack>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ mt: 3, width: "fit-content" }}
        disabled={
          (login === initialLogin &&
            email === initialEmail &&
            newPassword === "" &&
            confirmPassword === "") ||
          !!passwordError ||
          !!newPasswordError ||
          ((login !== initialLogin ||
            email !== initialEmail ||
            newPassword !== "" ||
            confirmPassword !== "") &&
            !currentPassword)
        }
      >
        Valider
      </Button>
    </ResponsiveStack>
  );
}
