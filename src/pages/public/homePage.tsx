import { useTheme } from "@mui/material";
import ResponsiveTitle from "../../components/responsiveTitle";
import ResponsiveBodyTypography from "../../components/responsiveBodyTypography";
import { ResponsivePaper } from "../../components/ResponsiveLayout";

export default function Home() {
  const theme = useTheme();
  console.log(theme);
  return (
    <>
      <ResponsiveTitle variant="h1">Hello World !</ResponsiveTitle>
      <ResponsivePaper
        paddingY={3}
        sx={{
          borderRadius: theme.shape.borderRadiusMd,
          backgroundColor: "background.paper",
          paddingX: 4,
        }}
        elevation={1}
      >
        <ResponsiveBodyTypography variant="bodyLg" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ResponsiveBodyTypography>
      </ResponsivePaper>
    </>
  );
}
