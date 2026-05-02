import useEntityMutations from "./useEntityMutations";
import {
  CREATE_COWORKER_MUTATION,
  DELETE_COWORKER_MUTATION,
  UPDATE_COWORKER_MUTATION,
} from "../../services/coworker/coworkerMutations";
import type { Coworker } from "../../types/entities/coworkerTypes";

export default function useCoworkerMutations() {
  return useEntityMutations<
    { input: Omit<Coworker, "id"> },
    { id: string; input: Partial<Coworker> }
  >(
    CREATE_COWORKER_MUTATION,
    UPDATE_COWORKER_MUTATION,
    DELETE_COWORKER_MUTATION,
  );
}
