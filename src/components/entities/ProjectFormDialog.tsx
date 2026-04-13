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

  useEffect(() => {
    if (open === true) {
      setInitialProject(null);
      setEditingProject({
        label: "",
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
            if (typeof open === "string" && editingProject?.id) {
              const input = editingProject;
              delete input.id;
              delete (input as any).__typename;
              handleEdit({
                variables: { id: open, input },
              });
            } else {
              handleAdd({ variables: { input: editingProject! } });
            }
          }}
          disabled={submitting || !hasChanges || !editingProject?.label}
          startIcon={<Icon path={mdiCheck} size={1} />}
          sx={{ flex: "1 1 auto" }}
        >
          {typeof open === "string" ? "Modifier" : "Ajouter"}
        </Button>,
      ]}
    />
  );
}
