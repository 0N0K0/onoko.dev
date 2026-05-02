import useEntityMutations from "./useEntityMutations";
import {
  CREATE_ROLE_MUTATION,
  DELETE_ROLE_MUTATION,
  UPDATE_ROLE_MUTATION,
} from "../../services/role/roleMutations";
import type { Role } from "../../types/entities/roleTypes";

export default function useRoleMutations() {
  return useEntityMutations<
    { input: Omit<Role, "id"> },
    { id: string; input: Partial<Role> }
  >(CREATE_ROLE_MUTATION, UPDATE_ROLE_MUTATION, DELETE_ROLE_MUTATION);
}
