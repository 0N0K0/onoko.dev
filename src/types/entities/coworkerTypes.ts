import type { EntityFormDialogProps } from "./entityTypes";
import type { Role } from "./roleTypes";

export interface Coworker {
  id: string;
  name: string;
  roles?: (Role | string)[];
}

export interface CoworkerFormDialogProps extends EntityFormDialogProps {
  coworkers?: Coworker[];
}
