import PasswordField from "./passwordField";

export default function NewPasswordFields({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  newPasswordError,
  setNewPasswordError,
  confirmPasswordError,
  setConfirmPasswordError,
}: {
  newPassword: string;
  setNewPassword: (pwd: string) => void;
  confirmPassword: string;
  setConfirmPassword: (pwd: string) => void;
  newPasswordError: string;
  setNewPasswordError: (msg: string) => void;
  confirmPasswordError: string;
  setConfirmPasswordError: (msg: string) => void;
}) {
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

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    const validationMsg = validatePassword(value);
    setNewPasswordError(validationMsg);
    if (value !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe doivent être identiques.");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    if (newPassword && e.target.value !== newPassword) {
      setConfirmPasswordError("Les mots de passe doivent être identiques.");
    } else {
      setConfirmPasswordError("");
    }
  };

  return (
    <>
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
        error={!!confirmPasswordError}
        errorText={confirmPasswordError}
      />
    </>
  );
}
