import { Button, Typography } from "@mui/material";
import { ResponsiveBox, ResponsiveStack } from "./ResponsiveLayout";
import { mdiDelete } from "@mdi/js";
import type { FieldsRepeaterProps } from "../../types/components/baseComponentTypes";
import CustomIconButton from "./CustomIconButton";
import type React from "react";

/**
 * Composant pour gérer une liste dynamique de champs
 * Permet d'ajouter, modifier et supprimer des éléments d'une liste dans un formulaire
 * @param {any} props.editingItem L'item en cours d'édition qui contient la liste à gérer
 * @param {string} props.values Le nom de la propriété de l'item qui contient la liste
 * @param {function} props.setEditingItem Fonction pour mettre à jour l'item en cours d'édition
 * @param {function} props.setHasChanges Fonction pour indiquer que des changements ont été effectués
 * @param {function} props.fields Fonction qui retourne les champs à afficher pour chaque élément de la liste (reçoit la valeur, l'index et une fonction onChange)
 */
export default function FieldsRepeater<T extends Record<string, unknown>>({
  label,
  editingItem,
  values,
  setEditingItem,
  setHasChanges,
  fields,
  minWidth = "100%",
  ...props
}: FieldsRepeaterProps<T> &
  Omit<React.ComponentPropsWithoutRef<typeof ResponsiveStack>, "children">) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const items = (editingItem?.[values] as any[]) ?? [];

  return (
    <ResponsiveStack
      paddingY={items.length ? 3 : 0}
      rowGap={3}
      {...props}
      sx={{
        paddingLeft: items.length ? 2 : 0,
        borderLeft: items.length ? "2px solid" : "none",
        borderColor: "divider",
        ...props.sx,
      }}
    >
      <ResponsiveStack
        sx={{
          flexDirection: "row",
          columnGap: 2,
          alignItems: "center",
          justifyContent: items.length > 0 ? "space-between" : "center",
        }}
      >
        {items.length > 0 && (
          <Typography variant="h6" component="h3">
            {label.title}
          </Typography>
        )}
        <Button
          variant="outlined"
          onClick={() => {
            setEditingItem({
              ...editingItem!,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              [values]: [...((editingItem?.[values] as any[]) ?? []), ""],
            } as T);
            setHasChanges(true);
          }}
          sx={{ width: "fit-content", minWidth: "208px" }}
        >
          + Ajouter {label.add}
        </Button>
      </ResponsiveStack>
      {items.length > 0 && (
        <ResponsiveBox
          rowGap={3}
          sx={{
            columnGap: 2,
            display: "grid",
            gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
          }}
        >
          {items.map((value, idx: number) => (
            <ResponsiveStack
              key={idx}
              sx={{ flexDirection: "row", columnGap: 2, alignItems: "center" }}
            >
              {fields(
                value,
                idx,
                (newValue) => {
                  const newValues = [...items];
                  newValues[idx] = newValue;
                  setEditingItem({ ...editingItem!, [values]: newValues } as T);
                  setHasChanges(true);
                },
                (key: string, newValue) => {
                  const newValues = [...items];
                  newValues[idx] = { ...newValues[idx], [key]: newValue };
                  setEditingItem({ ...editingItem!, [values]: newValues } as T);
                  setHasChanges(true);
                },
              )}
              <CustomIconButton
                icon={mdiDelete}
                color="error"
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const newValues = (
                    (editingItem?.[values] as any[]) ?? []
                  ).filter((_: unknown, i: number) => i !== idx);
                  setEditingItem({ ...editingItem!, [values]: newValues } as T);
                  setHasChanges(true);
                }}
              />
            </ResponsiveStack>
          ))}
        </ResponsiveBox>
      )}
    </ResponsiveStack>
  );
}
