import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { CustomTableProps } from "../types/components/baseComponentTypes";
import type { UseTableSelectionReturn } from "../hooks/useTableSelection";

export interface TableContextValue extends UseTableSelectionReturn {
  fields: CustomTableProps["fields"];
  items: any[];
  canSelect: boolean;
  submitting: boolean;
  deleteLabel: string;
  bulkEditTitle: string;
  bulkEditContent?: ReactNode;
  bulkEditDialogWidth: number;
  onClickAdd?: () => void;
  onClickEdit?: (id: string) => void;
  onClickDelete?: (ids: string[]) => void;
  onClickBulkEdit?: () => void;
  setBulkEditItems?: React.Dispatch<
    React.SetStateAction<any[] | null | undefined>
  >;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bulkEditDialogOpen: boolean;
  setBulkEditDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TableContext = createContext<TableContextValue | null>(null);

export function useTableContext(): TableContextValue {
  const ctx = useContext(TableContext);
  if (!ctx)
    throw new Error("Table sub-components must be used within <CustomTable>");
  return ctx;
}
