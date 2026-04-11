import { mdiCheck, mdiClose, mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Button,
  Checkbox,
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
import { ResponsiveStack } from "./ResponsiveLayout";
import DeleteConfirmationDialog from "../entities/DeleteConfirmationDialog";
import type { CustomTableProps } from "../../types/components/baseComponentTypes";
import CustomIconButton from "./CustomIconButton";
import CustomDialog from "./CustomDialog";

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
 * @param {string} props.bulkEditTitle Titre à afficher dans la boîte de dialogue de modification en masse
 * @param {React.ReactNode} props.bulkEditContent Contenu à afficher dans la boîte de dialogue de modification en masse
 * @param {number} props.bulkEditDialogWidth Largeur de la boîte de dialogue de modification en masse
 * @param {function} props.onClickBulkEdit Fonction à appeler lors du clic sur le bouton de modification en masse
 */
export default function CustomTable({
  fields,
  items,
  canSelect = false,
  onClickAdd,
  onClickEdit,
  onClickDelete,
  submitting = false,
  deleteLabel = "ces éléments",
  bulkEditTitle = "Modifier les éléments",
  bulkEditContent,
  bulkEditDialogWidth = 4,
  bulkEditItems,
  setBulkEditItems,
  onClickBulkEdit,
}: CustomTableProps) {
  const theme = useTheme();

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [bulkEditDialogOpen, setBulkEditDialogOpen] = useState(false);

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
                  <CustomIconButton
                    icon={mdiPlus}
                    disabled={submitting}
                    onClick={onClickAdd}
                    color="primary"
                  />
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
                        <CustomIconButton
                          icon={mdiPencil}
                          color="primary"
                          disabled={submitting}
                          onClick={() => onClickEdit(item.id)}
                        />
                      )}
                      {onClickDelete && (
                        <CustomIconButton
                          icon={mdiDelete}
                          color="error"
                          disabled={submitting}
                          onClick={() => {
                            setSelectedItems([item.id]);
                            setDeleteDialogOpen(true);
                          }}
                        />
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
            (onClickDelete || onClickBulkEdit) && (
              <TableFooter
                sx={{
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <TableRow sx={{}}>
                  <TableCell
                    colSpan={fields.length + 2}
                    sx={{ borderTop: `1px solid rgba(81, 81, 81, 1)` }}
                  >
                    <ResponsiveStack
                      direction="row"
                      columnGap={2}
                      width="100%"
                      justifyContent="flex-end"
                    >
                      {onClickBulkEdit && setBulkEditItems && (
                        <Button
                          startIcon={<Icon path={mdiPencil} size={1} />}
                          onClick={() => {
                            setBulkEditItems(
                              selectedItems.map((id) =>
                                items.find((item) => item.id === id),
                              ),
                            );
                            setBulkEditDialogOpen(true);
                          }}
                          disabled={submitting}
                        >
                          Modifier
                        </Button>
                      )}
                      {onClickDelete && (
                        <Button
                          color="error"
                          startIcon={<Icon path={mdiDelete} size={1} />}
                          onClick={() => setDeleteDialogOpen(true)}
                          disabled={submitting}
                        >
                          Supprimer
                        </Button>
                      )}
                    </ResponsiveStack>
                  </TableCell>
                </TableRow>
              </TableFooter>
            )}
        </Table>
      </TableContainer>
      {bulkEditDialogOpen && onClickBulkEdit && (
        <CustomDialog
          open={bulkEditDialogOpen}
          onClose={() => setBulkEditDialogOpen(false)}
          title={bulkEditTitle}
          content={bulkEditContent}
          actions={[
            <Button
              key="cancel"
              onClick={() => {
                setBulkEditDialogOpen(false);
              }}
              disabled={submitting}
              startIcon={<Icon path={mdiClose} size={1} />}
            >
              Annuler
            </Button>,
            <Button
              key="confirm"
              color="success"
              onClick={() => {
                onClickBulkEdit();
                setBulkEditDialogOpen(false);
              }}
              disabled={submitting}
              startIcon={<Icon path={mdiCheck} size={1} />}
            >
              Valider
            </Button>,
          ]}
          width={bulkEditDialogWidth}
        />
      )}
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
