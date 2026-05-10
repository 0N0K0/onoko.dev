import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import CustomDialog from "../custom/CustomDialog";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheck, mdiClose } from "@mdi/js";
import useFormDialog from "../../hooks/useFormDialog";
import { stripHtml } from "../../utils/stringUtils";
import type {
  Testimony,
  TestimonyFormDialogProps,
} from "../../types/entities/testimonyTypes";
import WysiwygField from "../custom/WysiwygField";
import { DatePicker } from "@mui/x-date-pickers";

/**
 * Composant de dialogue pour ajouter ou modifier un témoignage.
 * Ce composant affiche un formulaire dans un dialogue personnalisé, permettant à l'utilisateur de saisir les informations d'un témoignage, telles que le nom, l'entreprise et le contenu.
 * Il gère à la fois les cas d'ajout et de modification en fonction de la valeur de la prop `open`, qui peut être un booléen ou une chaîne de caractères représentant l'ID d'un témoignage existant.
 * Le composant utilise des états locaux pour gérer les données du formulaire et détecter les changements, ainsi que des hooks personnalisés pour récupérer les témoignages disponibles.
 * @param {Object} props Les propriétés du composant.
 * @param {boolean | string} props.open Indique si le dialogue est ouvert ou fermé, ou contient l'ID d'un témoignage à modifier.
 * @param {function} props.setOpen Fonction pour changer l'état d'ouverture du dialogue.
 * @param {Testimony[]} props.testimonies La liste des témoignages existants, utilisée pour pré-remplir le formulaire en cas de modification.
 * @param {function} props.handleAdd Fonction à appeler pour ajouter un nouveau témoignage avec les données du formulaire.
 * @param {function} props.handleEdit Fonction à appeler pour modifier un témoignage existant avec les données du formulaire.
 * @param {boolean} props.submitting Indique si une opération de soumission est en cours, utilisé pour désactiver les actions du dialogue pendant la soumission.
 */
export default function TestimonyFormDialog({
  open,
  setOpen,
  testimonies,
  handleAdd,
  handleEdit,
  submitting,
}: TestimonyFormDialogProps) {
  const {
    initialItem: initialTestimony,
    editingItem: editingTestimony,
    setEditingItem: setEditingTestimony,
    hasChanges,
    setHasChanges,
  } = useFormDialog<Testimony>({
    open,
    items: testimonies,
    defaults: { name: "", content: "", company: "", createdAt: undefined },
  });
  console.log(editingTestimony);

  return (
    <CustomDialog
      key="formDialog"
      open={!!open}
      onClose={() => setOpen(false)}
      title={`${typeof open === "string" ? "Modifier le" : "Ajouter un"} témoignage`}
      content={(() => {
        return (
          <ResponsiveStack rowGap={3} sx={{ overflow: "visible" }}>
            <ResponsiveStack
              rowGap={3}
              sx={{ flexDirection: "row", columnGap: 2 }}
            >
              <TextField
                label="Nom"
                value={stripHtml(editingTestimony?.name || "")}
                onChange={(e) => {
                  setEditingTestimony(
                    editingTestimony
                      ? { ...editingTestimony, name: e.target.value }
                      : null,
                  );
                  e.target.value !== (initialTestimony?.name || "") &&
                    setHasChanges(true);
                }}
              />
              <TextField
                label="Entité"
                value={stripHtml(editingTestimony?.company || "")}
                onChange={(e) => {
                  setEditingTestimony(
                    editingTestimony
                      ? { ...editingTestimony, company: e.target.value }
                      : null,
                  );
                  e.target.value !== (initialTestimony?.company || "") &&
                    setHasChanges(true);
                }}
              />
            </ResponsiveStack>
            <ResponsiveStack
              rowGap={3}
              sx={{ flexDirection: "row", columnGap: 2 }}
            >
              <DatePicker
                label="Date"
                views={["year", "month"]}
                format="MM/YYYY"
                sx={{ flex: "1 0 208px" }}
                value={editingTestimony?.createdAt ?? null}
                onChange={(date) => {
                  setEditingTestimony((prev) =>
                    prev ? { ...prev, createdAt: date ?? undefined } : null,
                  );
                  date?.valueOf() !== initialTestimony?.createdAt?.valueOf() &&
                    setHasChanges(true);
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={editingTestimony?.insert || false}
                    onChange={(e) => {
                      setEditingTestimony((prev) =>
                        prev ? { ...prev, insert: e.target.checked } : prev,
                      );
                      e.target.checked !==
                        (initialTestimony?.insert || false) &&
                        setHasChanges(true);
                    }}
                  />
                }
                label="Encart"
              />
            </ResponsiveStack>
            <WysiwygField
              label="Témoignage"
              value={editingTestimony?.content || ""}
              onChange={(val) => {
                setEditingTestimony((prev) =>
                  prev ? { ...prev, content: val } : null,
                );
                val !== (initialTestimony?.content || "") &&
                  setHasChanges(true);
              }}
            />
          </ResponsiveStack>
        );
      })()}
      actions={[
        <Button
          key="cancel"
          onClick={() => setOpen(false)}
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
            if (typeof open === "string" && editingTestimony?.id) {
              const input = editingTestimony;
              delete input.id;
              delete (input as any).__typename;
              handleEdit({
                variables: { id: open, input },
              });
            } else {
              handleAdd({ variables: { input: editingTestimony! } });
            }
          }}
          disabled={submitting || !hasChanges || !editingTestimony?.content}
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
