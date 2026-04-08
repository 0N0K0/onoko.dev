import {
  mdiAccountCog,
  mdiAccountHardHat,
  mdiApplicationArrayOutline,
  mdiFolder,
  mdiHardHat,
  mdiMultimedia,
  mdiTag,
  mdiViewDashboard,
} from "@mdi/js";

export const ADMIN_MENU_LINKS = {
  "/admin": {
    icon: mdiViewDashboard,
    label: "Tableau de bord",
  },
  "/admin/projects": {
    icon: mdiFolder,
    label: "Projets",
  },
  "/admin/stacks": {
    icon: mdiApplicationArrayOutline,
    label: "Technologies",
  },
  "/admin/coworkers": {
    icon: mdiAccountHardHat,
    label: "Intervenants",
  },
  "/admin/roles": {
    icon: mdiHardHat,
    label: "Rôles",
  },
  "/admin/categories": {
    icon: mdiTag,
    label: "Catégories",
  },
  "/admin/medias": {
    icon: mdiMultimedia,
    label: "Médias",
  },
  "/admin/account": {
    icon: mdiAccountCog,
    label: "Mon compte",
  },
};
