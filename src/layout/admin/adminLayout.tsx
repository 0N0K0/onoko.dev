import { Paper } from "@mui/material";
import AdminHeader from "./adminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Paper style={{ minHeight: "100vh" }} square>
      <AdminHeader />
      <main>{children}</main>
    </Paper>
  );
}
