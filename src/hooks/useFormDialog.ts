import { useEffect, useRef, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

export interface UseFormDialogReturn<T> {
  initialItem: T | null;
  editingItem: Partial<T> | null;
  setEditingItem: Dispatch<SetStateAction<Partial<T> | null>>;
  hasChanges: boolean;
  setHasChanges: Dispatch<SetStateAction<boolean>>;
}

export default function useFormDialog<T extends { id: string }>({
  open,
  items,
  defaults,
}: {
  open: boolean | string;
  items: T[] | undefined;
  defaults: Partial<T>;
}): UseFormDialogReturn<T> {
  const defaultsRef = useRef(defaults);
  const [initialItem, setInitialItem] = useState<T | null>(null);
  const [editingItem, setEditingItem] = useState<Partial<T> | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (open === true) {
      setInitialItem(null);
      setEditingItem({ ...defaultsRef.current });
      setHasChanges(false);
    } else if (typeof open === "string") {
      const item = items?.find((i) => i.id === open) ?? null;
      setInitialItem(item);
      setEditingItem(item);
      setHasChanges(false);
    } else {
      setInitialItem(null);
      setEditingItem(null);
      setHasChanges(false);
    }
  }, [open, items]);

  return {
    initialItem,
    editingItem,
    setEditingItem,
    hasChanges,
    setHasChanges,
  };
}
