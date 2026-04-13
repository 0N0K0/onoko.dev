import { useQuery } from "@apollo/client/react";
import { PROJECTS_QUERY } from "../../services/project/projectQueries";
import useCategories from "./useCategories";
import type { Project } from "../../types/entities/projectTypes";
import useMedias from "./useMedias";
import type { Role } from "../../types/entities/roleTypes";
import useRoles from "./useRoles";
import type { Category } from "../../types/entities/categoryTypes";
import type { Media } from "../../types/entities/mediaTypes";
import useCoworkers from "./useCoworkers";
import type { Coworker } from "../../types/entities/coworkerTypes";
import useStacks from "./useStacks";

export default function useProjects() {
  const { categories } = useCategories();
  const { medias } = useMedias();
  const { roles } = useRoles();
  const { coworkers } = useCoworkers();
  const { stacks } = useStacks();

  const { loading, error, data, refetch } = useQuery<{ projects: Project[] }>(
    PROJECTS_QUERY,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  const projects = (data?.projects ?? []).map((project) => {
    let newProject = { ...project };
    if (project.thumbnail) {
      newProject.thumbnail = medias.find((m) => m.id === project.thumbnail);
    }
    if (project.categories) {
      newProject.categories = project.categories.map((category) => {
        if (typeof category === "string") {
          const fullCategory = categories.find((c) => c.id === category);
          return fullCategory || {};
        }
        return category;
      }) as Category[];
    }
    if (project.mockup?.images) {
      newProject = {
        ...newProject,
        mockup: {
          ...project.mockup,
          images: project.mockup.images.map((image) => {
            if (typeof image === "string") {
              const fullImage = medias.find((m) => m.id === image);
              return fullImage || {};
            }
            return image;
          }) as Media[],
        },
      };
    }
    if (project.client?.logo) {
      newProject = {
        ...newProject,
        client: {
          ...project.client,
          logo: medias.find((m) => m.id === project.client?.logo),
        },
      };
    }
    if (project.roles) {
      newProject.roles = project.roles.map((role) => {
        if (typeof role === "string") {
          const fullRole = roles.find((r) => r.id === role);
          return fullRole || {};
        }
        return role;
      }) as Role[];
    }
    if (project.coworkers) {
      newProject.coworkers = project.coworkers.map((coworker) => {
        const coworkerName = coworkers.find((c) => c.id === coworker.id)?.name;
        const coworkerRoles = coworker.roles?.map((role) => {
          if (typeof role === "string") {
            const fullRole = roles.find((r) => r.id === role);
            return fullRole || {};
          }
          return role;
        }) as Role[];
        return { ...coworker, name: coworkerName, roles: coworkerRoles };
      }) as Coworker[];
    }
    if (project.stacks) {
      newProject.stacks = project.stacks.map((stack) => {
        const fullStack = stacks.find((s) => s.id === stack.id);
        return fullStack
          ? { ...stack, label: fullStack.label, icon: fullStack.icon }
          : stack;
      });
    }
    return newProject;
  });
  return { projects, loading, error, refetch };
}
