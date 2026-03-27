import { IconButton, InputAdornment, TextField } from "@mui/material";
import Icon from "@mdi/react";
import { mdiEyeOff, mdiEye } from "@mdi/js";
import { useState } from "react";
import type { PasswordFieldProps } from "../types/baseComponent";

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
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      fullWidth
      required={required}
      value={value}
      onChange={onChange}
      error={error}
      helperText={error ? errorText || "Ce champ est requis" : helperText || ""}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword((v) => !v)}
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
  );
}
