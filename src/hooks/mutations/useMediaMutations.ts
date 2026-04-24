import useEntityMutations from "./useEntityMutations";
import {
  ADD_MEDIA_MUTATION,
  REMOVE_MEDIA_MUTATION,
  UPDATE_MEDIA_MUTATION,
} from "../../services/media/mediaMutations";
import type { Media } from "../../types/entities/mediaTypes";

export default function useMediaMutations() {
  return useEntityMutations<
    { input: { file: File | null; category?: string } },
    { id: string; input: Partial<Media> }
  >(ADD_MEDIA_MUTATION, UPDATE_MEDIA_MUTATION, REMOVE_MEDIA_MUTATION);
}
