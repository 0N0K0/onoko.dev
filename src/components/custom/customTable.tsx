import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { ResponsiveStack } from "./responsiveLayout";
import DeleteConfirmationDialog from "../entities/DeleteConfirmationDialog";
import type { CustomTableProps } from "../../types/baseComponent";

/**
 * Composant de table personnalisée utilisant MUI Table
 * Permet d'afficher une liste d'items avec des actions d'ajout, de modification et de suppression
 * @param {CustomTableProps} props Propriétés de la table, incluant les champs à afficher, les items, et les fonctions de gestion des actions
 * @param {{
 *           key: string;
 *           label: string;
 *           content?: (item: any) => React.ReactNode;
 *         }[]} props.fields Liste des champs à afficher, avec une clé et un label, et éventuellement une fonction de rendu personnalisée
 * @param {any[]} props.items Liste des items à afficher dans la table
 * @param {boolean} props.canSelect Indique si les items peuvent être sélectionnés (affiche des cases à cocher)
 * @param {function} props.onClickAdd Fonction à appeler lors du clic sur le bouton d'ajout
 * @param {function} props.onClickEdit Fonction à appeler lors du clic sur le bouton de modification d'un item
 * @param {function} props.onClickDelete Fonction à appeler lors du clic sur le bouton de suppression d'items sélectionnés
 * @param {boolean} props.submitting Indique si une action est en cours de soumission (pour désactiver les boutons)
 * @param {string} props.deleteLabel Label à afficher dans la confirmation de suppression (ex: "cette catégorie")
 */
export default function CustomTable({
  fields,
  items,
  canSelect = false,
  onClickAdd,
  onClickEdit,
  onClickDelete,
  submitting = false,
  deleteLabel = "cette entité",
}: CustomTableProps) {
  const theme = useTheme();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSelectMultiple = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(items?.map((c) => c.id) || []);
    } else {
      setSelectedItems([]);
    }
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <TableContainer sx={{ flex: "1 1 auto", minHeight: 0 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {canSelect && (
                <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }}>
                  <Checkbox
                    indeterminate={
                      selectedItems.length > 0 &&
                      selectedItems.length < (items?.length || 0)
                    }
                    checked={
                      items?.length > 0 && selectedItems.length === items.length
                    }
                    onChange={handleSelectMultiple}
                  />
                </TableCell>
              )}
              {fields.map((field) => (
                <TableCell key={`${field.key}-label`}>{field.label}</TableCell>
              ))}
              {onClickAdd && (
                <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }}>
                  <IconButton
                    disabled={submitting}
                    onClick={onClickAdd}
                    color="primary"
                  >
                    <Icon path={mdiPlus} size={1}></Icon>
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                {canSelect && (
                  <TableCell>
                    <Checkbox
                      checked={selectedItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems([...selectedItems, item.id]);
                        } else {
                          setSelectedItems(
                            selectedItems.filter((id) => id !== item.id),
                          );
                        }
                      }}
                    />
                  </TableCell>
                )}
                {fields.map((field) => (
                  <TableCell key={`${field.key}-${item.id}`}>
                    {field.content ? field.content(item) : item[field.key]}
                  </TableCell>
                ))}
                {(onClickEdit || onClickDelete) && (
                  <TableCell>
                    <ResponsiveStack
                      direction="row"
                      rowGap={0}
                      columnGap={0}
                      width="100%"
                      justifyContent="flex-end"
                    >
                      {onClickEdit && (
                        <IconButton
                          color="primary"
                          disabled={submitting}
                          onClick={() => onClickEdit(item.id)}
                        >
                          <Icon path={mdiPencil} size={1}></Icon>
                        </IconButton>
                      )}
                      {onClickDelete && (
                        <IconButton
                          color="error"
                          disabled={submitting}
                          onClick={() => {
                            setSelectedItems([item.id]);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Icon path={mdiDelete} size={1}></Icon>
                        </IconButton>
                      )}
                    </ResponsiveStack>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
          {canSelect &&
            items.length > 1 &&
            selectedItems.length > 1 &&
            onClickDelete && (
              <TableFooter
                sx={{
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <TableRow sx={{}}>
                  <TableCell
                    colSpan={4}
                    align="right"
                    sx={{ borderTop: `1px solid rgba(81, 81, 81, 1)` }}
                  >
                    <Button
                      color="error"
                      startIcon={<Icon path={mdiDelete} size={1} />}
                      onClick={() => setDeleteDialogOpen(true)}
                      disabled={submitting}
                    >
                      Supprimer les catégories sélectionnées
                    </Button>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
        </Table>
      </TableContainer>
      {onClickDelete && (
        <DeleteConfirmationDialog
          label={deleteLabel}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onClickDelete={() => {
            onClickDelete(selectedItems);
            setSelectedItems([]);
          }}
          submitting={submitting}
        />
      )}
    </>
  );
}
