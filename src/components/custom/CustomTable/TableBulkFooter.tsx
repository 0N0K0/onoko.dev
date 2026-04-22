import { mdiDelete, mdiPencil } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Button,
  TableCell,
  TableFooter,
  TableRow,
  useTheme,
} from "@mui/material";
import { useTableContext } from "../../../context/TableContext";
import { ResponsiveStack } from "../ResponsiveLayout";

export default function TableBulkFooter() {
  const theme = useTheme();
  const {
    canSelect,
    items,
    fields,
    selectedItems,
    submitting,
    onClickDelete,
    onClickBulkEdit,
    setBulkEditItems,
    setBulkEditDialogOpen,
    setDeleteDialogOpen,
  } = useTableContext();

  if (
    !canSelect ||
    items.length <= 1 ||
    selectedItems.length <= 1 ||
    (!onClickDelete && !onClickBulkEdit)
  ) {
    return null;
  }

  return (
    <TableFooter
      sx={{
        position: "sticky",
        bottom: 0,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <TableRow>
        <TableCell
          colSpan={fields.length + 2}
          sx={{ borderTop: `1px solid rgba(81, 81, 81, 1)` }}
        >
          <ResponsiveStack
            sx={{
              flexDirection: "row",
              columnGap: 2,
              width: "100%",
              justifyContent: "flex-end",
            }}
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
  );
}
