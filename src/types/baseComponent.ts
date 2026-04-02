import type { SnackbarCloseReason } from "@mui/material";

/**
 * Ce fichier définit les types TypeScript pour les composants de base utilisés dans l'application, tels que les champs de mot de passe, les alertes Snackbar et les tables personnalisées.
 * Ces types permettent d'assurer une utilisation cohérente et typée de ces composants à travers l'application, facilitant ainsi le développement et la maintenance du code.
 */

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

export interface CustomTableProps {
  fields: {
    key: string;
    label: string;
    content?: (item: any) => React.ReactNode;
  }[];
  items: any[];
  canSelect?: boolean;
  onClickAdd?: () => void;
  onClickEdit?: (item: any) => void;
  onClickDelete?: (ids: string[]) => void;
  submitting?: boolean;
  deleteLabel?: string;
}
