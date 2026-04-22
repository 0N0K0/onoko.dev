import { mdiDelete, mdiPencil } from "@mdi/js";
import { Checkbox, TableBody, TableCell, TableRow } from "@mui/material";
import { useTableContext } from "../../../context/TableContext";
import CustomIconButton from "../CustomIconButton";
import { ResponsiveStack } from "../ResponsiveLayout";

export default function TableRows() {
  const {
    fields,
    items,
    canSelect,
    selectedItems,
    handleSelectOne,
    selectSingle,
    submitting,
    onClickEdit,
    onClickDelete,
    setDeleteDialogOpen,
  } = useTableContext();

  return (
    <TableBody>
      {items.map((item) => (
        <TableRow key={item.id}>
          {canSelect && (
            <TableCell>
              <Checkbox
                checked={selectedItems.includes(item.id)}
                onChange={(e) => handleSelectOne(item.id, e.target.checked)}
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
                sx={{
                  flexDirection: "row",
                  rowGap: 0,
                  columnGap: 0,
                  width: "100%",
                  justifyContent: "flex-end",
                }}
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
                      selectSingle(item.id);
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
  );
}
