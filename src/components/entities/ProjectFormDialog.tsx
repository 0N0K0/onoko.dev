import { Button, TextField } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import type {
  Project,
  ProjectFormDialogProps,
} from "../../types/entities/projectTypes";
import { useEffect, useState } from "react";
import MediaPicker from "./media/MediaPicker";
import CustomSelect from "../custom/CustomSelect";
import useCategories from "../../hooks/queries/useCategories";
import type { Category } from "../../types/entities/categoryTypes";
import type { Media } from "../../types/entities/mediaTypes";
import ResponsiveTitle from "../custom/ResponsiveTitle";
import { DatePicker } from "@mui/x-date-pickers";
import WysiwygField from "../custom/WysiwygField";
import type { Role } from "../../types/entities/roleTypes";
import useRoles from "../../hooks/queries/useRoles";
import FieldsRepeater from "../custom/FieldsRepeater";
import useCoworkers from "../../hooks/queries/useCoworkers";
import useStacks from "../../hooks/queries/useStacks";
import useMedias from "../../hooks/queries/useMedias";

/**
 * Composant de dialogue pour ajouter ou modifier un projet.
 * Ce composant affiche un formulaire dans un dialogue personnalisé, permettant à l'utilisateur de saisir les informations d'un projet, telles que son label.
 * Il gère à la fois les cas d'ajout et de modification en fonction de la valeur de la prop `open`, qui peut être un booléen ou une chaîne de caractères représentant l'ID d'un projet existant.
 * Le composant utilise des états locaux pour gérer les données du formulaire et détecter les changements, ainsi que des hooks personnalisés pour récupérer les projets disponibles.
 * @param {Object} props Les propriétés du composant.
 * @param {boolean | string} props.open Indique si le dialogue est ouvert ou fermé, ou contient l'ID d'un projet à modifier.
 * @param {function} props.setOpen Fonction pour changer l'état d'ouverture du dialogue.
 * @param {Project[]} props.projects La liste des projets existants, utilisée pour pré-remplir le formulaire en cas de modification.
 * @param {function} props.handleAdd Fonction à appeler pour ajouter un nouveau projet avec les données du formulaire.
 * @param {function} props.handleEdit Fonction à appeler pour modifier un projet existant avec les données du formulaire.
 * @param {boolean} props.submitting Indique si une opération de soumission est en cours, utilisé pour désactiver les actions du dialogue pendant la soumission.
 */
export default function ProjectFormDialog({
  open,
  setOpen,
  projects,
  handleAdd,
  handleEdit,
  submitting,
}: ProjectFormDialogProps) {
  const [initialProject, setInitialProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(
    null,
  );
  const [hasChanges, setHasChanges] = useState(false);

  const { categories } = useCategories();
  const { roles } = useRoles();
  const { coworkers } = useCoworkers();
  const { stacks } = useStacks();
  const { medias } = useMedias();

  useEffect(() => {
    console.log("initialProject", initialProject);
  }, [initialProject]);

  useEffect(() => {
    if (open === true) {
      setInitialProject(null);
      setEditingProject({
        label: "",
        thumbnail: "",
        categories: [],
        website: {
          url: "",
          label: "",
        },
        mockup: {
          url: "",
          label: "",
          images: [],
        },
        client: {
          label: "",
          logo: "",
        },
        manager: {
          name: "",
          email: "",
        },
        startDate: undefined,
        endDate: undefined,
        intro: {
          context: "",
          objective: "",
          client: "",
        },
        presentation: {
          description: "",
          issue: "",
          audience: "",
        },
        need: {
          features: "",
          functionalConstraints: "",
          technicalConstraints: "",
        },
        organization: {
          workload: "",
          anticipation: "",
          methodology: "",
          evolution: "",
          validation: "",
        },
        roles: [],
        coworkers: [],
        stacks: [],
        kpis: {
          issues: 0,
          points: 0,
          commits: 0,
          pullRequests: 0,
        },
        feedback: {
          general: "",
          client: "",
        },
      });
      setHasChanges(false);
    } else if (typeof open === "string") {
      const project = projects?.find((r) => r.id === open) || null;
      setInitialProject(project);
      setEditingProject(project);
      setHasChanges(false);
    } else if (!open) {
      setInitialProject(null);
      setEditingProject(null);
      setHasChanges(false);
    }
  }, [open, projects]);

  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => {
        (setOpen(false),
          setInitialProject(null),
          setEditingProject(null),
          setHasChanges(false));
      }}
      title={`${typeof open === "string" ? "Modifier le" : "Ajouter un"} projet`}
      content={(() => {
        return (
          <ResponsiveStack rowGap={3} style={{ overflow: "visible" }}>
            {/* Miniature */}
            <MediaPicker
              labels={{ singular: "une miniature", plural: "des miniatures" }}
              initialImages={
                editingProject && editingProject.thumbnail
                  ? (medias?.filter((m) => {
                      const thumb = editingProject.thumbnail;
                      const thumbId =
                        typeof thumb === "string" ? thumb : (thumb as any)?.id;
                      return m.id === thumbId;
                    }) ?? [])
                  : []
              }
              onChange={(value) => {
                setEditingProject((prev) =>
                  prev ? { ...prev, thumbnail: value } : prev,
                );
                value !== (initialProject?.thumbnail || "") &&
                  setHasChanges(true);
              }}
            />
            {/* Label */}
            <TextField
              label="Label"
              value={editingProject?.label || ""}
              onChange={(e) => {
                setEditingProject(
                  editingProject
                    ? { ...editingProject, label: e.target.value }
                    : null,
                );
                e.target.value !== (initialProject?.label || "") &&
                  setHasChanges(true);
              }}
              required
            />
            {/* Catégories */}
            <CustomSelect
              label="Catégories"
              labelId="categories-label"
              value={
                editingProject?.categories
                  ? Array.isArray(editingProject.categories)
                    ? editingProject.categories.map((c) =>
                        typeof c === "string" ? c : c.id,
                      )
                    : typeof editingProject.categories === "string"
                      ? [editingProject.categories]
                      : [(editingProject.categories as Category).id]
                  : []
              }
              onChange={(e) => {
                const value = (e.target as { value: string | string[] }).value;
                setEditingProject((prev) =>
                  prev
                    ? {
                        ...prev,
                        categories: Array.isArray(value) ? value : [value],
                      }
                    : prev,
                );
                const initialCategories = initialProject?.categories
                  ? Array.isArray(initialProject.categories)
                    ? initialProject.categories.map((c) =>
                        typeof c === "string" ? c : c.id,
                      )
                    : typeof initialProject.categories === "string"
                      ? [initialProject.categories]
                      : [(initialProject.categories as Category).id]
                  : [];
                const newCategories = Array.isArray(value) ? value : [value];
                JSON.stringify(initialCategories.sort()) !==
                  JSON.stringify(newCategories.sort()) && setHasChanges(true);
              }}
              options={
                categories
                  ?.filter((c: Category) => c.entity === "project")
                  .map((c: Category) => ({
                    id: c.id,
                    label: c.depth
                      ? "__".repeat(c.depth) + ` ${c.label}`
                      : c.label,
                  })) || []
              }
            />
            {/* Site internet */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                Site internet
              </ResponsiveTitle>
              <ResponsiveStack
                direction="row"
                columnGap={2}
                alignItems="center"
              >
                <TextField
                  label="URL"
                  value={editingProject?.website?.url || ""}
                  onChange={(e) => {
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            website: {
                              label: prev.website?.label ?? "",
                              ...prev.website,
                              url: e.target.value,
                            },
                          }
                        : null,
                    );
                    e.target.value !== (initialProject?.website?.url || "") &&
                      setHasChanges(true);
                  }}
                />
                <TextField
                  label="Label"
                  value={editingProject?.website?.label || ""}
                  onChange={(e) => {
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            website: {
                              url: prev.website?.url ?? "",
                              ...prev.website,
                              label: e.target.value,
                            },
                          }
                        : null,
                    );
                    e.target.value !== (initialProject?.website?.label || "") &&
                      setHasChanges(true);
                  }}
                />
              </ResponsiveStack>
            </ResponsiveStack>
            {/* Maquette */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                Maquette
              </ResponsiveTitle>
              <MediaPicker
                labels={{
                  singular: "une image de maquette",
                  plural: "des images de maquette",
                }}
                multiple
                initialImages={(() => {
                  const images = editingProject?.mockup?.images;
                  if (!images?.length) return [];
                  return (
                    medias?.filter((m) =>
                      images.some((img) => {
                        const imgId =
                          typeof img === "string" ? img : (img as any)?.id;
                        return m.id === imgId;
                      }),
                    ) ?? []
                  );
                })()}
                onChange={(value) => {
                  const newIds = value ? value.split(",").filter(Boolean) : [];
                  const existingMedia = (
                    editingProject?.mockup?.images ?? []
                  ).filter((i): i is Media => "path" in i);
                  const merged = newIds.map((id, position) => {
                    const full = existingMedia.find((m) => m.id === id);
                    return full ? full : { id, position };
                  });
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          mockup: {
                            url: prev.mockup?.url ?? "",
                            label: prev.mockup?.label ?? "",
                            ...prev.mockup,
                            images: merged,
                          },
                        }
                      : null,
                  );
                  const initialIds = (initialProject?.mockup?.images ?? [])
                    .map((i) => i.id)
                    .sort()
                    .join(",");
                  const newSortedIds = [...newIds].sort().join(",");
                  initialIds !== newSortedIds && setHasChanges(true);
                }}
              />
              <ResponsiveStack
                direction="row"
                columnGap={2}
                alignItems="center"
              >
                <TextField
                  label="URL"
                  value={editingProject?.mockup?.url || ""}
                  onChange={(e) => {
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            mockup: {
                              label: prev.mockup?.label ?? "",
                              images: prev.mockup?.images ?? [],
                              ...prev.mockup,
                              url: e.target.value,
                            },
                          }
                        : null,
                    );
                    e.target.value !== (initialProject?.mockup?.url || "") &&
                      setHasChanges(true);
                  }}
                />
                <TextField
                  label="Label"
                  value={editingProject?.mockup?.label || ""}
                  onChange={(e) => {
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            mockup: {
                              url: prev.mockup?.url ?? "",
                              images: prev.mockup?.images ?? [],
                              ...prev.mockup,
                              label: e.target.value,
                            },
                          }
                        : null,
                    );
                    e.target.value !== (initialProject?.mockup?.label || "") &&
                      setHasChanges(true);
                  }}
                />
              </ResponsiveStack>
            </ResponsiveStack>
            {/* Client */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                Client
              </ResponsiveTitle>
              <MediaPicker
                labels={{
                  singular: "un logo",
                  plural: "des logos",
                }}
                initialImages={
                  editingProject && editingProject.client?.logo
                    ? (medias?.filter((m) => {
                        const logo = editingProject.client?.logo;
                        const logoId =
                          typeof logo === "string" ? logo : (logo as any)?.id;
                        return m.id === logoId;
                      }) ?? [])
                    : []
                }
                onChange={(value) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          client: {
                            label: prev.client?.label ?? "",
                            ...prev.client,
                            logo: value,
                          },
                        }
                      : null,
                  );
                  value !== (initialProject?.client?.logo || "") &&
                    setHasChanges(true);
                }}
              />
              <TextField
                label="Label"
                value={editingProject?.client?.label || ""}
                onChange={(e) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          client: {
                            logo: prev.client?.logo ?? "",
                            ...prev.client,
                            label: e.target.value,
                          },
                        }
                      : null,
                  );
                  e.target.value !== (initialProject?.client?.label || "") &&
                    setHasChanges(true);
                }}
              />
            </ResponsiveStack>
            {/* Responsable */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                Responsable
              </ResponsiveTitle>
              <ResponsiveStack
                direction="row"
                columnGap={2}
                alignItems="center"
              >
                <TextField
                  label="Nom"
                  value={editingProject?.manager?.name || ""}
                  onChange={(e) => {
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            manager: {
                              email: prev.manager?.email ?? "",
                              ...prev.manager,
                              name: e.target.value,
                            },
                          }
                        : null,
                    );
                    e.target.value !== (initialProject?.manager?.name || "") &&
                      setHasChanges(true);
                  }}
                />
                <TextField
                  label="Email"
                  value={editingProject?.manager?.email || ""}
                  onChange={(e) => {
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            manager: {
                              name: prev.manager?.name ?? "",
                              ...prev.manager,
                              email: e.target.value,
                            },
                          }
                        : null,
                    );
                    e.target.value !== (initialProject?.manager?.email || "") &&
                      setHasChanges(true);
                  }}
                />
              </ResponsiveStack>
            </ResponsiveStack>
            {/* Introduction */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                Introduction
              </ResponsiveTitle>
              <WysiwygField
                label="Contexte"
                value={editingProject?.intro?.context || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? { ...prev, intro: { ...prev.intro, context: val } }
                      : null,
                  );
                  val !== (initialProject?.intro?.context || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Objectif"
                value={editingProject?.intro?.objective || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? { ...prev, intro: { ...prev.intro, objective: val } }
                      : null,
                  );
                  val !== (initialProject?.intro?.objective || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Client"
                value={editingProject?.intro?.client || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? { ...prev, intro: { ...prev.intro, client: val } }
                      : null,
                  );
                  val !== (initialProject?.intro?.client || "") &&
                    setHasChanges(true);
                }}
              />
            </ResponsiveStack>
            {/* Présentation */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                Présentation
              </ResponsiveTitle>
              <WysiwygField
                label="Description"
                value={editingProject?.presentation?.description || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          presentation: {
                            ...prev.presentation,
                            description: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.presentation?.description || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Finalités et enjeux"
                value={editingProject?.presentation?.issue || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          presentation: {
                            ...prev.presentation,
                            issue: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.presentation?.issue || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Utilisateurs cibles"
                value={editingProject?.presentation?.audience || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          presentation: { ...prev.presentation, audience: val },
                        }
                      : null,
                  );
                  val !== (initialProject?.presentation?.audience || "") &&
                    setHasChanges(true);
                }}
              />
            </ResponsiveStack>
            {/* Besoin */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                Analyse du besoin
              </ResponsiveTitle>
              <WysiwygField
                label="Fonctionnalités attendues"
                value={editingProject?.need?.features || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          need: {
                            ...prev.need,
                            features: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.need?.features || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Contraintes fonctionnelles"
                value={editingProject?.need?.functionalConstraints || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          need: {
                            ...prev.need,
                            functionalConstraints: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.need?.functionalConstraints || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Contraintes techniques"
                value={editingProject?.need?.technicalConstraints || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          need: { ...prev.need, technicalConstraints: val },
                        }
                      : null,
                  );
                  val !== (initialProject?.need?.technicalConstraints || "") &&
                    setHasChanges(true);
                }}
              />
            </ResponsiveStack>
            {/* Organisation */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                Gestion de projet
              </ResponsiveTitle>
              <ResponsiveStack
                direction="row"
                columnGap={2}
                alignItems="center"
              >
                <DatePicker
                  label="Date de début"
                  sx={{ flex: "1 1 208px" }}
                  value={editingProject?.startDate ?? null}
                  onChange={(date) => {
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            startDate: date ?? undefined,
                          }
                        : null,
                    );
                    date?.valueOf() !== initialProject?.startDate?.valueOf() &&
                      setHasChanges(true);
                  }}
                />
                <DatePicker
                  label="Date de fin"
                  sx={{ flex: "1 1 208px" }}
                  value={editingProject?.endDate ?? null}
                  onChange={(date) => {
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            endDate: date ?? undefined,
                          }
                        : null,
                    );
                    date?.valueOf() !== initialProject?.endDate?.valueOf() &&
                      setHasChanges(true);
                  }}
                />
              </ResponsiveStack>
              <TextField
                label="Temps de travail"
                value={editingProject?.organization?.workload || ""}
                onChange={(e) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          organization: {
                            ...prev.organization,
                            workload: e.target.value,
                          },
                        }
                      : null,
                  );
                  e.target.value !==
                    (initialProject?.organization?.workload || "") &&
                    setHasChanges(true);
                }}
              />
              <CustomSelect
                label="Rôles"
                labelId="roles-label"
                value={
                  editingProject?.roles
                    ? Array.isArray(editingProject.roles)
                      ? editingProject.roles.map((c) =>
                          typeof c === "string" ? c : c.id,
                        )
                      : typeof editingProject.roles === "string"
                        ? [editingProject.roles]
                        : [(editingProject.roles as Role).id]
                    : []
                }
                onChange={(e) => {
                  const value = (e.target as { value: string | string[] })
                    .value;
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          roles: Array.isArray(value) ? value : [value],
                        }
                      : prev,
                  );
                  const initialRoles = initialProject?.roles
                    ? Array.isArray(initialProject.roles)
                      ? initialProject.roles.map((r) =>
                          typeof r === "string" ? r : r.id,
                        )
                      : typeof initialProject.roles === "string"
                        ? [initialProject.roles]
                        : [(initialProject.roles as Role).id]
                    : [];
                  const newRoles = Array.isArray(value) ? value : [value];
                  JSON.stringify(initialRoles.sort()) !==
                    JSON.stringify(newRoles.sort()) && setHasChanges(true);
                }}
                options={
                  roles.map((r: Role) => ({
                    id: r.id,
                    label: r.label,
                  })) || []
                }
              />
              {/* Intervenants */}
              <FieldsRepeater
                label={{ title: "Intervenant", add: "un intervenant" }}
                editingItem={editingProject}
                values="coworkers"
                setEditingItem={setEditingProject}
                setHasChanges={setHasChanges}
                fields={(item, idx, onChange, onChangeField) => (
                  <>
                    <CustomSelect
                      label="Intervenant"
                      labelId={`coworker-${idx}-label`}
                      value={typeof item.id === "string" ? item.id : ""}
                      onChange={(e) => {
                        const newId = (e.target as { value: string }).value;
                        onChange({ ...item, id: newId });
                      }}
                      options={
                        coworkers.map((c) => ({
                          id: c.id,
                          label: c.name,
                        })) || []
                      }
                    />
                    <CustomSelect
                      label="Rôles"
                      labelId={`coworker-${idx}-roles-label`}
                      value={
                        Array.isArray(item.roles)
                          ? item.roles.map((r: Role | string) =>
                              typeof r === "string" ? r : r.id,
                            )
                          : item.roles
                            ? [
                                typeof item.roles === "string"
                                  ? item.roles
                                  : (item.roles as Role).id,
                              ]
                            : []
                      }
                      onChange={(e) => {
                        const value = (e.target as { value: string | string[] })
                          .value;
                        const newRoles = Array.isArray(value) ? value : [value];
                        onChangeField("roles", newRoles);
                        const initialRoles = initialProject?.coworkers?.[idx]
                          ?.roles
                          ? Array.isArray(initialProject.coworkers[idx].roles)
                            ? initialProject.coworkers[idx].roles.map(
                                (r: Role | string) =>
                                  typeof r === "string" ? r : r.id,
                              )
                            : [
                                typeof initialProject.coworkers[idx].roles ===
                                "string"
                                  ? initialProject.coworkers[idx].roles
                                  : (
                                      initialProject.coworkers[idx]
                                        .roles as Role
                                    ).id,
                              ]
                          : [];
                        JSON.stringify([...initialRoles].sort()) !==
                          JSON.stringify([...newRoles].sort()) &&
                          setHasChanges(true);
                      }}
                      options={(() => {
                        const selectedCoworker = coworkers.find(
                          (c) => c.id === item.id,
                        );
                        const coworkerRoles = selectedCoworker?.roles ?? [];
                        return coworkerRoles
                          .map((r) =>
                            typeof r === "string"
                              ? roles.find((role) => role.id === r)
                              : r,
                          )
                          .filter((r): r is Role => !!r)
                          .map((r) => ({ id: r.id, label: r.label }));
                      })()}
                    />
                  </>
                )}
              />
              <WysiwygField
                label="Anticipation des risques"
                value={editingProject?.organization?.anticipation || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          organization: {
                            ...prev.organization,
                            anticipation: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.organization?.anticipation || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Méthodologie"
                value={editingProject?.organization?.methodology || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          organization: {
                            ...prev.organization,
                            methodology: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.organization?.methodology || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Evolutions"
                value={editingProject?.organization?.evolution || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          organization: {
                            ...prev.organization,
                            evolution: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.organization?.evolution || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Modalités de validation"
                value={editingProject?.organization?.validation || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          organization: {
                            ...prev.organization,
                            validation: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.organization?.validation || "") &&
                    setHasChanges(true);
                }}
              />
            </ResponsiveStack>
            {/* Stacks */}
            <FieldsRepeater
              label={{ title: "Technologie", add: "une technologie" }}
              editingItem={editingProject}
              values="stacks"
              setEditingItem={setEditingProject}
              setHasChanges={setHasChanges}
              fields={(item, idx, onChange) => (
                <>
                  <CustomSelect
                    label="Technologie"
                    labelId={`stack-${idx}-label`}
                    value={typeof item.id === "string" ? item.id : ""}
                    onChange={(e) => {
                      const newId = (e.target as { value: string }).value;
                      onChange({ ...item, id: newId });
                    }}
                    options={
                      stacks.map((s) => ({
                        id: s.id,
                        label: s.label,
                      })) || []
                    }
                  />
                  <CustomSelect
                    label="Version"
                    labelId={`stack-${idx}-version-label`}
                    value={typeof item.version === "string" ? item.version : ""}
                    onChange={(e) => {
                      const newVersion = (e.target as { value: string }).value;
                      onChange({ ...item, version: newVersion });
                    }}
                    options={(
                      stacks.find((s) => s.id === item.id)?.versions ?? []
                    ).map((v) => ({ id: v, label: v }))}
                  />
                  <CustomSelect
                    label="Section"
                    labelId={`stack-${idx}-section-label`}
                    value={typeof item.section === "string" ? item.section : ""}
                    onChange={(e) => {
                      const newSection = (e.target as { value: string }).value;
                      onChange({ ...item, section: newSection });
                    }}
                    options={[
                      { id: "mockup", label: "Maquette" },
                      { id: "need", label: "Analyse du besoin" },
                      {
                        id: "features",
                        label: "__ Fonctionnalités",
                      },
                      {
                        id: "functionalConstraints",
                        label: "__ Contraintes fonctionnelles",
                      },
                      {
                        id: "technicalConstraints",
                        label: "__ Contraintes techniques",
                      },
                      { id: "organisation", label: "Organisation" },
                      {
                        id: "anticipation",
                        label: "__ Anticipation des risques",
                      },
                      {
                        id: "methodology",
                        label: "__ Méthodologie",
                      },
                      {
                        id: "evolution",
                        label: "__ Evolutions",
                      },
                      {
                        id: "validation",
                        label: "__ Modalités de validation",
                      },
                    ]}
                  />
                </>
              )}
            />
            {/* KPIS */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                KPIs
              </ResponsiveTitle>
              <ResponsiveStack
                direction="row"
                columnGap={2}
                alignItems="center"
              >
                <TextField
                  label="Taches"
                  type="number"
                  value={editingProject?.kpis?.issues ?? 0}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10) || 0;
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            kpis: { ...prev.kpis, issues: newValue },
                          }
                        : null,
                    );
                    newValue !== (initialProject?.kpis?.issues ?? 0) &&
                      setHasChanges(true);
                  }}
                />
                <TextField
                  label="Points"
                  type="number"
                  value={editingProject?.kpis?.points ?? 0}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10) || 0;
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            kpis: { ...prev.kpis, points: newValue },
                          }
                        : null,
                    );
                    newValue !== (initialProject?.kpis?.points ?? 0) &&
                      setHasChanges(true);
                  }}
                />
                <TextField
                  label="Commits"
                  type="number"
                  value={editingProject?.kpis?.commits ?? 0}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10) || 0;
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            kpis: { ...prev.kpis, commits: newValue },
                          }
                        : null,
                    );
                    newValue !== (initialProject?.kpis?.commits ?? 0) &&
                      setHasChanges(true);
                  }}
                />
                <TextField
                  label="Pull requests"
                  type="number"
                  value={editingProject?.kpis?.pullRequests ?? 0}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value, 10) || 0;
                    setEditingProject((prev) =>
                      prev
                        ? {
                            ...prev,
                            kpis: { ...prev.kpis, pullRequests: newValue },
                          }
                        : null,
                    );
                    newValue !== (initialProject?.kpis?.pullRequests ?? 0) &&
                      setHasChanges(true);
                  }}
                />
              </ResponsiveStack>
            </ResponsiveStack>
            {/* Retours */}
            <ResponsiveStack rowGap={3}>
              <ResponsiveTitle variant="h6" component="h3">
                Retours
              </ResponsiveTitle>
              <WysiwygField
                label="Général"
                value={editingProject?.feedback?.general || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          feedback: {
                            ...prev.feedback,
                            general: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.feedback?.general || "") &&
                    setHasChanges(true);
                }}
              />
              <WysiwygField
                label="Client"
                value={editingProject?.feedback?.client || ""}
                onChange={(val) => {
                  setEditingProject((prev) =>
                    prev
                      ? {
                          ...prev,
                          feedback: {
                            ...prev.feedback,
                            client: val,
                          },
                        }
                      : null,
                  );
                  val !== (initialProject?.feedback?.client || "") &&
                    setHasChanges(true);
                }}
              />
            </ResponsiveStack>
          </ResponsiveStack>
        );
      })()}
      actions={[
        <Button
          key="cancel"
          onClick={() => {
            setOpen(false);
            setInitialProject(null);
            setEditingProject(null);
            setHasChanges(false);
          }}
          disabled={submitting}
          startIcon={<Icon path={mdiClose} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          Annuler
        </Button>,
        <Button
          key="confirm"
          color="success"
          onClick={() => {
            if (!editingProject) return;

            const toId = (v: any) => (typeof v === "string" ? v : (v?.id ?? v));

            const stripTypename = (obj: any): any => {
              if (Array.isArray(obj)) return obj.map(stripTypename);
              if (obj && typeof obj === "object") {
                const { __typename, ...rest } = obj;
                return Object.fromEntries(
                  Object.entries(rest).map(([k, v]) => [k, stripTypename(v)]),
                );
              }
              return obj;
            };

            const input: any = {
              ...stripTypename(editingProject),
              categories: (editingProject.categories ?? []).map(toId),
              roles: (editingProject.roles ?? []).map(toId),
              thumbnail: editingProject.thumbnail
                ? toId(editingProject.thumbnail)
                : undefined,
              client: editingProject.client
                ? {
                    ...stripTypename(editingProject.client),
                    logo: editingProject.client.logo
                      ? toId(editingProject.client.logo)
                      : undefined,
                  }
                : undefined,
              coworkers: (editingProject.coworkers ?? []).map((c) => ({
                id: toId(c.id ?? c),
                roles: (c.roles ?? []).map(toId),
              })),
              stacks: (editingProject.stacks ?? []).map((s) => ({
                id: toId(s.id ?? s),
                version: s.version,
                section: s.section,
              })),
              mockup: editingProject.mockup
                ? {
                    ...stripTypename(editingProject.mockup),
                    images: (editingProject.mockup.images ?? []).map((img) => ({
                      id: toId(img),
                      position: (img as any).position,
                    })),
                  }
                : undefined,
              startDate: editingProject.startDate?.toISOString(),
              endDate: editingProject.endDate?.toISOString(),
            };
            delete input.id;

            if (typeof open === "string" && editingProject?.id) {
              handleEdit({ variables: { id: open, input } });
            } else {
              handleAdd({ variables: { input } });
            }
          }}
          disabled={submitting || !hasChanges || !editingProject?.label}
          startIcon={<Icon path={mdiCheck} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          {typeof open === "string" ? "Modifier" : "Ajouter"}
        </Button>,
      ]}
      width={12}
    />
  );
}
