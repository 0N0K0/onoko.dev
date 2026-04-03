import type {
  EntityFormDialogProps,
  useEntityMutationProps,
} from "./entityTypes";

export interface Role {
  id: string;
  label: string;
}

export interface RoleContextType {
  roles?: Role[];
  setRoles: React.Dispatch<React.SetStateAction<Role[] | undefined>>;
  loading: boolean;
  itemsError: string;
}

export interface RoleFormDialogProps extends EntityFormDialogProps {
  roles?: Role[];
}

export interface useRoleMutationProps extends useEntityMutationProps {
  roles?: Role[] | undefined;
  setRoles: React.Dispatch<React.SetStateAction<Role[] | undefined>>;
}
