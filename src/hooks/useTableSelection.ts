import { useState } from "react";

export interface UseTableSelectionReturn {
  selectedItems: string[];
  isAllSelected: boolean;
  isIndeterminate: boolean;
  handleSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectOne: (id: string, checked: boolean) => void;
  selectSingle: (id: string) => void;
  clearSelection: () => void;
}

export default function useTableSelection(
  items: { id: string }[],
): UseTableSelectionReturn {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const isAllSelected =
    items.length > 0 && selectedItems.length === items.length;
  const isIndeterminate =
    selectedItems.length > 0 && selectedItems.length < items.length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedItems(e.target.checked ? items.map((item) => item.id) : []);
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    setSelectedItems((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id),
    );
  };

  const selectSingle = (id: string) => setSelectedItems([id]);

  const clearSelection = () => setSelectedItems([]);

  return {
    selectedItems,
    isAllSelected,
    isIndeterminate,
    handleSelectAll,
    handleSelectOne,
    selectSingle,
    clearSelection,
  };
}
