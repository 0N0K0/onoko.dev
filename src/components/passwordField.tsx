import { IconButton, InputAdornment, TextField } from "@mui/material";
import Icon from "@mdi/react";
import { mdiEyeOff, mdiEye } from "@mdi/js";
import { useState } from "react";
import type { PasswordFieldProps } from "../types/baseComponent";

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
