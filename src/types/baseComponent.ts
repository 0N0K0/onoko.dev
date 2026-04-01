import type { SnackbarCloseReason } from "@mui/material";

export interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  autoComplete?: string;
}

export interface NewPasswordFieldsProps {
  newPassword: string;
  setNewPassword: (pwd: string) => void;
  confirmPassword: string;
  setConfirmPassword: (pwd: string) => void;
  newPasswordError: string;
  setNewPasswordError: (msg: string) => void;
  confirmPasswordError: string;
  setConfirmPasswordError: (msg: string) => void;
}

export interface SnackbarAlertProps {
  open: boolean;
  message: string;
  severity?: "success" | "error" | "warning" | "info";
  onClose?: (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => void;
  autohideDuration?: number;
}

export interface ClosableSnackbarAlertProps extends SnackbarAlertProps {
  setOpen: (open: boolean) => void;
}
