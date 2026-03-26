import AdminHeader from "./adminHeader";
import RootPaper from "../rootPaper";
import { ResponsivePaper } from "../../components/ResponsiveLayout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootPaper>
      <AdminHeader />
      <ResponsivePaper
        component="main"
        paddingY={3}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingX: 4,
        }}
      >
        {children}
      </ResponsivePaper>
    </RootPaper>
  );
}
