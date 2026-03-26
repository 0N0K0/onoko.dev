import { ResponsivePaper } from "../components/ResponsiveLayout";

export default function RootPaper({ children }: { children: React.ReactNode }) {
  return (
    <ResponsivePaper
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      square
    >
      {children}
    </ResponsivePaper>
  );
}
