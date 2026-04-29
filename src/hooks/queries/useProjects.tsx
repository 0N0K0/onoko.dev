import { useQuery } from "@apollo/client/react";
import { PROJECTS_QUERY } from "../../services/project/projectQueries";
import useCategories from "./useCategories";
import type { Project } from "../../types/entities/projectTypes";
import useMedias from "./useMedias";
import useRoles from "./useRoles";
import type { Coworker } from "../../types/entities/coworkerTypes";
import useCoworkers from "./useCoworkers";
import useStacks from "./useStacks";
import dayjs from "dayjs";
import { normalizeRef, normalizeRefs } from "../../utils/normalizeRef";

export default function useProjects() {
  const { categories } = useCategories();
  const { medias } = useMedias();
  const { roles } = useRoles();
  const { coworkers } = useCoworkers();
  const { stacks } = useStacks();

  const { loading, error, data, refetch } = useQuery<{ projects: Project[] }>(
    PROJECTS_QUERY,
    { fetchPolicy: "cache-and-network" },
  );

  const projects = (data?.projects ?? []).map((project) => ({
    ...project,
    startDate: project.startDate
      ? dayjs(Number(project.startDate))
      : project.startDate,
    endDate: project.endDate ? dayjs(Number(project.endDate)) : project.endDate,
    thumbnail: normalizeRef(project.thumbnail, medias),
    categories: project.categories
      ? normalizeRefs(project.categories, categories)
      : project.categories,
    roles: project.roles ? normalizeRefs(project.roles, roles) : project.roles,
    mockup: project.mockup
      ? {
          ...project.mockup,
          images: project.mockup.images?.map((image) => {
            const media = medias.find((m) => m.id === image.id);
            return media
              ? { ...media, position: image.position }
              : { id: image.id, position: image.position };
          }),
        }
      : project.mockup,
    client: project.client
      ? {
          ...project.client,
          logo: normalizeRef(project.client.logo, medias),
        }
      : project.client,
    coworkers: project.coworkers?.map((coworker) => ({
      ...coworker,
      ...normalizeRef(coworker, coworkers),
      roles: coworker.roles
        ? normalizeRefs(coworker.roles, roles)
        : coworker.roles,
    })) as Coworker[],
    stacks: project.stacks
      ?.map((stack) => ({
        ...(stack.id ? (normalizeRef(stack.id, stacks) ?? stack) : stack),
        section: stack.section,
        version: stack.version,
      }))
      .sort((a, b) => {
        if (!a.label) return 1;
        if (!b.label) return -1;
        if (a.label < b.label) return -1;
        if (a.label > b.label) return 1;
        return 0;
      })
      .sort((a, b) => {
        if (!a.section) return 1;
        if (!b.section) return -1;
        if (a.section < b.section) return -1;
        if (a.section > b.section) return 1;
        return 0;
      }),
  }));

  return { projects, loading, error, refetch };
}
