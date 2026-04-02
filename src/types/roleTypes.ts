import type { useEntityMutationProps } from "./entityTypes";

export interface Role {
  id: string;
  label: string;
}

export interface RoleContextType {
  roles: Role[] | undefined;
  setRoles: React.Dispatch<React.SetStateAction<Role[] | undefined>>;
  loading: boolean;
  itemsError: string;
}

export interface RoleFormDialogProps {
  open: boolean | string;
  setOpen: (open: boolean | string) => void;
  initialRole: Role | null;
  setInitialRole: (role: Role | null) => void;
  editingRole: Partial<Role> | null;
  setEditingRole: (role: Partial<Role> | null) => void;
  hasChanges: boolean;
  setHasChanges: (hasChanges: boolean) => void;
  handleAdd: () => void;
  handleEdit: () => void;
  submitting: boolean;
}

export interface useRoleMutationProps extends useEntityMutationProps {
  initialRole?: Role | null;
  setInitialRole?: React.Dispatch<React.SetStateAction<Role | null>>;
  editingRole?: Partial<Role> | null;
  setEditingRole?: React.Dispatch<React.SetStateAction<Partial<Role> | null>>;
  roles?: Role[] | undefined;
  setRoles: React.Dispatch<React.SetStateAction<Role[] | undefined>>;
}
