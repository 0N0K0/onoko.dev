import type { SnackbarCloseReason } from "@mui/material";
import type { ChangeEvent, ReactNode } from "react";

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

export interface CustomDialogProps {
  open: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  title?: string;
  titlePaddingBottom?: string;
  actions?: React.ReactNode;
}

export interface FieldsRepeaterProps {
  editingItem: any;
  values: string;
  setEditingItem: React.Dispatch<React.SetStateAction<any>>;
  setHasChanges: React.Dispatch<React.SetStateAction<boolean>>;
  fields: (
    value: any,
    idx: number,
    onChange: (newValue: any) => void,
  ) => React.ReactNode;
}

export interface CustomSelectProps {
  label: string;
  labelId: string;
  value: string;
  onChange: (
    event:
      | ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string }>
      | (Event & { target: { value: string; name: string } }),
    child: ReactNode,
  ) => void;
  options: { id: string; label: string }[];
}
