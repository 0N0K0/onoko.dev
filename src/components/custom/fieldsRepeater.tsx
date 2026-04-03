import { Button } from "@mui/material";
import { ResponsiveStack } from "./responsiveLayout";
import { mdiDelete } from "@mdi/js";
import type { FieldsRepeaterProps } from "../../types/components/baseComponent";
import CustomIconButton from "./customIconButton";
import ResponsiveTitle from "./responsiveTitle";

/**
 * Composant pour gérer une liste dynamique de champs
 * Permet d'ajouter, modifier et supprimer des éléments d'une liste dans un formulaire
 * @param {any} props.editingItem L'item en cours d'édition qui contient la liste à gérer
 * @param {string} props.values Le nom de la propriété de l'item qui contient la liste
 * @param {function} props.setEditingItem Fonction pour mettre à jour l'item en cours d'édition
 * @param {function} props.setHasChanges Fonction pour indiquer que des changements ont été effectués
 * @param {function} props.fields Fonction qui retourne les champs à afficher pour chaque élément de la liste (reçoit la valeur, l'index et une fonction onChange)
 */
export default function FieldsRepeater({
  label,
  editingItem,
  values,
  setEditingItem,
  setHasChanges,
  fields,
}: FieldsRepeaterProps) {
  const items = editingItem?.[values] || [];

  return (
    <ResponsiveStack
      paddingLeft={items.length ? 2 : 0}
      paddingY={items.length ? 3 : 0}
      rowGap={3}
      sx={{
        borderLeft: items.length ? "2px solid" : "none",
        borderColor: "divider",
      }}
    >
      {items.length > 0 && (
        <ResponsiveTitle variant="h6" component="h3">
          {label.title}
        </ResponsiveTitle>
      )}
      {items.map((value: any, idx: number) => (
        <ResponsiveStack
          direction="row"
          columnGap={1}
          alignItems="center"
          key={idx}
        >
          {fields(value, idx, (newValue: any) => {
            const newValues = [...items];
            newValues[idx] = newValue;
            setEditingItem({ ...editingItem, [values]: newValues });
            setHasChanges(true);
          })}
          <CustomIconButton
            icon={mdiDelete}
            color="error"
            onClick={() => {
              const newValues = (editingItem[values] || []).filter(
                (_: any, i: number) => i !== idx,
              );
              setEditingItem({ ...editingItem, [values]: newValues });
              setHasChanges(true);
            }}
          />
        </ResponsiveStack>
      ))}
      <Button
        variant="outlined"
        onClick={() => {
          setEditingItem({
            ...editingItem,
            [values]: [...(editingItem[values] || []), ""],
          });
          setHasChanges(true);
        }}
      >
        + Ajouter {label.add}
      </Button>
    </ResponsiveStack>
  );
}
