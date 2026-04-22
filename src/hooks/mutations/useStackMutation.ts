import useEntityMutations from "./useEntityMutations";
import {
  CREATE_STACK_MUTATION,
  DELETE_STACK_MUTATION,
  UPDATE_STACK_MUTATION,
} from "../../services/stack/stackMutations";
import type { Stack } from "../../types/entities/stackTypes";

export default function useStackMutations() {
  return useEntityMutations<
    { input: Omit<Stack, "id"> },
    { id: string; input: Partial<Stack> }
  >(CREATE_STACK_MUTATION, UPDATE_STACK_MUTATION, DELETE_STACK_MUTATION);
}
