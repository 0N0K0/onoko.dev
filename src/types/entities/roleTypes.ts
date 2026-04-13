import type { EntityFormDialogProps } from "./entityTypes";

export interface Role {
  id: string;
  label: string;
}

export interface RoleFormDialogProps extends EntityFormDialogProps {
  roles?: Role[];
}
