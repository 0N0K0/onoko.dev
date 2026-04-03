import type {
  EntityFormDialogProps,
  useEntityMutationProps,
} from "./entityTypes";
import type { Role } from "./roleTypes";

export interface Coworker {
  id: string;
  name: string;
  roles?: Role[] | String[];
}

export interface CoworkerFormDialogProps extends EntityFormDialogProps {
  coworkers?: Coworker[];
}

export interface useCoworkerMutationProps extends useEntityMutationProps {
  coworkers?: Coworker[];
  setCoworkers: React.Dispatch<React.SetStateAction<Coworker[] | undefined>>;
}
