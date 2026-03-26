import PublicHeader from "./publicHeader";
import PublicFooter from "./publicFooter";
import RootPaper from "../rootPaper";
import { ResponsivePaper } from "../../components/ResponsiveLayout";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RootPaper>
      <PublicHeader />
      <ResponsivePaper
        component="main"
        paddingY={3}
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          paddingX: 4,
        }}
        square
        elevation={0}
      >
        {children}
      </ResponsivePaper>
      <PublicFooter />
    </RootPaper>
  );
}
