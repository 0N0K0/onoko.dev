export interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string;
  errorText?: string;
  required?: boolean;
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
