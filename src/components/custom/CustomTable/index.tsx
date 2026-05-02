import { Table, TableContainer } from "@mui/material";
import type { CustomTableProps } from "../../../types/components/baseComponentTypes";
import { TableContext } from "../../../context/TableContext";
import TableProvider from "./TableProvider";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";
import TableBulkFooter from "./TableBulkFooter";
import TableDialogs from "./TableDialogs";

function CustomTableRoot(props: CustomTableProps) {
  return (
    <TableProvider {...props}>
      <TableContainer sx={{ flex: "1 1 auto", minHeight: 0 }}>
        <Table stickyHeader>
          <TableHeader />
          <TableRows />
          <TableBulkFooter />
        </Table>
      </TableContainer>
      <TableDialogs />
    </TableProvider>
  );
}

const CustomTable = Object.assign(CustomTableRoot, {
  Provider: TableProvider,
  Header: TableHeader,
  Body: TableRows,
  BulkFooter: TableBulkFooter,
  Dialogs: TableDialogs,
  Context: TableContext,
});

export default CustomTable;
