import useEntityMutations from "./useEntityMutations";
import {
  CREATE_PROJECT_MUTATION,
  DELETE_PROJECT_MUTATION,
  UPDATE_PROJECT_MUTATION,
} from "../../services/project/projectMutations";
import type { Project } from "../../types/entities/projectTypes";

export default function useProjectMutations() {
  return useEntityMutations<
    { input: Omit<Project, "id"> },
    { id: string; input: Partial<Project> }
  >(CREATE_PROJECT_MUTATION, UPDATE_PROJECT_MUTATION, DELETE_PROJECT_MUTATION);
}
