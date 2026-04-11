import { InputAdornment, TextField } from "@mui/material";
import { mdiEyeOff, mdiEye } from "@mdi/js";
import { useState } from "react";
import type { PasswordFieldProps } from "../../types/components/baseComponentTypes";
import CustomIconButton from "./CustomIconButton";

/**
 * Composant de champ de mot de passe avec option d'affichage du mot de passe.
 * @param {string} props.label Le label du champ.
 * @param {string} props.value La valeur actuelle du champ.
 * @param {function} props.onChange Fonction de rappel pour gérer les changements de valeur.
 * @param {boolean} props.error Indique si le champ est en erreur.
 * @param {string} props.helperText Texte d'aide à afficher sous le champ.
 * @param {string} props.errorText Texte d'erreur à afficher lorsque le champ est en erreur.
 * @param {boolean} props.required Indique si le champ est requis.
 */
export default function PasswordField({
  label,
  value,
  onChange,
  error,
  helperText,
  errorText,
  required,
  autoComplete,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      required={required}
      value={value}
      onChange={onChange}
      error={error}
      helperText={error ? errorText || "Ce champ est requis" : helperText || ""}
      autoComplete={autoComplete}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <CustomIconButton
                onClick={() => setShowPassword((v) => !v)}
                edge="end"
                icon={showPassword ? mdiEyeOff : mdiEye}
              />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
