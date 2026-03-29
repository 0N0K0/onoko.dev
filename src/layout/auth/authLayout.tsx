import { useTheme } from "@mui/material";
import { ResponsivePaper } from "../../components/custom/responsiveLayout";
import RootPaper from "../rootPaper";

export default function AuthLayout({
  children,
  component,
  onSubmit,
}: {
  children: React.ReactNode;
  component?: React.ElementType;
  onSubmit?: (e: React.SubmitEvent) => void;
}) {
  const theme = useTheme();

  return (
    <RootPaper
      sx={{
        alignItems: "center",
        justifyContent: "center !important",
      }}
    >
      <ResponsivePaper
        component={component}
        onSubmit={onSubmit}
        paddingY={3}
        rowGap={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingX: 4,
          width: "100%",
        }}
        style={{ maxWidth: `${theme.breakpoints.values.md}px` }}
        elevation={1}
      >
        {children}
      </ResponsivePaper>
    </RootPaper>
  );
}
