import type { useEntityMutationProps } from "./entityTypes";
import type { Role } from "./roleTypes";

export interface Coworker {
  id: string;
  name: string;
  roles?: Role[] | String[];
}

export interface CoworkerFormDialogProps {
  open: boolean | string;
  setOpen: (open: boolean | string) => void;
  initialCoworker: Coworker | null;
  setInitialCoworker: (coworker: Coworker | null) => void;
  editingCoworker: Partial<Coworker> | null;
  setEditingCoworker: (coworker: Partial<Coworker> | null) => void;
  hasChanges: boolean;
  setHasChanges: (hasChanges: boolean) => void;
  handleAdd: () => void;
  handleEdit: () => void;
  submitting: boolean;
}

export interface useCoworkerMutationProps extends useEntityMutationProps {
  initialCoworker?: Coworker | null;
  setInitialCoworker?: React.Dispatch<React.SetStateAction<Coworker | null>>;
  editingCoworker?: Partial<Coworker> | null;
  setEditingCoworker?: React.Dispatch<
    React.SetStateAction<Partial<Coworker> | null>
  >;
  coworkers?: Coworker[] | undefined;
  setCoworkers: React.Dispatch<React.SetStateAction<Coworker[] | undefined>>;
}
