import type {
  IconButtonProps,
  SelectChangeEvent,
  SnackbarCloseReason,
} from "@mui/material";
import type { ReactNode } from "react";

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
  onClickEdit?: (id: string) => void;
  onClickDelete?: (ids: string[]) => void;
  submitting?: boolean;
  deleteLabel?: string;
  bulkEditTitle?: string;
  bulkEditContent?: React.ReactNode;
  bulkEditDialogWidth?: number;
  bulkEditItems?: any[] | null;
  setBulkEditItems?: React.Dispatch<
    React.SetStateAction<any[] | null | undefined>
  >;
  onClickBulkEdit?: () => void;
}

export interface CustomDialogProps {
  open: boolean;
  onClose?: () => void;
  content: React.ReactNode;
  title?: string;
  titlePaddingBottom?: string;
  actions?: React.ReactNode;
  width?: number;
  height?: number | string;
  closeButton?: boolean;
}

export interface FieldsRepeaterProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  label: {
    title: string;
    add: string;
  };
  editingItem: T | null | undefined;
  values: string;
  setEditingItem: React.Dispatch<React.SetStateAction<T | null>>;
  setHasChanges: (hasChanges: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: (
    value: any,
    idx: number,
    onChange: (newValue: any) => void,
    onChangeField: (key: string, newValue: any) => void,
  ) => React.ReactNode;
  minWidth?: number | string;
}

export interface CustomSelectProps {
  label: string;
  labelId: string;
  value: string | string[];
  onChange?: (
    event: SelectChangeEvent<string | string[]>,
    child: ReactNode,
  ) => void;
  options: { id: string; label: string }[];
  emptyOption?: boolean;
}

export interface CustomIconButtonProps extends IconButtonProps {
  icon: string;
  iconSize?: number;
  href?: string;
}
