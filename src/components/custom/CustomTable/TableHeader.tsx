import { mdiPlus } from "@mdi/js";
import { Checkbox, TableCell, TableHead, TableRow } from "@mui/material";
import { useTableContext } from "../../../context/TableContext";
import CustomIconButton from "../CustomIconButton";

export default function TableHeader() {
  const {
    fields,
    canSelect,
    isAllSelected,
    isIndeterminate,
    handleSelectAll,
    onClickAdd,
    submitting,
  } = useTableContext();

  return (
    <TableHead>
      <TableRow>
        {canSelect && (
          <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }}>
            <Checkbox
              indeterminate={isIndeterminate}
              checked={isAllSelected}
              onChange={handleSelectAll}
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
  );
}
