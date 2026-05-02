import { useTableContext } from "../../../context/TableContext";
import BulkEditFormDialog from "../../entities/BulkEditFormDialog";
import DeleteConfirmationDialog from "../../entities/DeleteConfirmationDialog";

export default function TableDialogs() {
  const {
    onClickDelete,
    deleteDialogOpen,
    setDeleteDialogOpen,
    selectedItems,
    clearSelection,
    bulkEditDialogOpen,
    setBulkEditDialogOpen,
    onClickBulkEdit,
    deleteLabel,
    bulkEditTitle,
    bulkEditContent,
    bulkEditDialogWidth,
    submitting,
  } = useTableContext();

  return (
    <>
      {bulkEditDialogOpen && onClickBulkEdit && (
        <BulkEditFormDialog
          open={bulkEditDialogOpen}
          setOpen={() => setBulkEditDialogOpen(false)}
          title={bulkEditTitle}
          content={bulkEditContent}
          onClick={onClickBulkEdit}
          width={bulkEditDialogWidth}
          disabled={submitting}
        />
      )}
      {onClickDelete && (
        <DeleteConfirmationDialog
          label={deleteLabel}
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          onClickDelete={() => {
            onClickDelete(selectedItems);
            clearSelection();
          }}
          submitting={submitting}
        />
      )}
    </>
  );
}
