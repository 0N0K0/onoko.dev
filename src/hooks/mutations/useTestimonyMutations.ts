import useEntityMutations from "./useEntityMutations";
import {
  CREATE_TESTIMONY_MUTATION,
  DELETE_TESTIMONY_MUTATION,
  UPDATE_TESTIMONY_MUTATION,
} from "../../services/testimony/testimonyMutations";
import type { Testimony } from "../../types/entities/testimonyTypes";

export default function useTestimonyMutations() {
  return useEntityMutations<
    { input: Omit<Testimony, "id"> },
    { id: string; input: Partial<Testimony> }
  >(
    CREATE_TESTIMONY_MUTATION,
    UPDATE_TESTIMONY_MUTATION,
    DELETE_TESTIMONY_MUTATION,
  );
}
