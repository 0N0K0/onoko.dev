import { useState } from "react";
import type { ReactNode } from "react";
import { TableContext } from "../../../context/TableContext";
import type { CustomTableProps } from "../../../types/components/baseComponentTypes";
import useTableSelection from "../../../hooks/useTableSelection";

export default function TableProvider({
  children,
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
  setBulkEditItems,
  onClickBulkEdit,
}: CustomTableProps & { children: ReactNode }) {
  const selection = useTableSelection(items);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bulkEditDialogOpen, setBulkEditDialogOpen] = useState(false);

  return (
    <TableContext.Provider
      value={{
        fields,
        items,
        canSelect,
        submitting,
        deleteLabel,
        bulkEditTitle,
        bulkEditContent,
        bulkEditDialogWidth,
        onClickAdd,
        onClickEdit,
        onClickDelete,
        onClickBulkEdit,
        setBulkEditItems,
        ...selection,
        deleteDialogOpen,
        setDeleteDialogOpen,
        bulkEditDialogOpen,
        setBulkEditDialogOpen,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
