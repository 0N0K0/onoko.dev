import { useTheme } from "@mui/material";
import ResponsiveTitle from "../../components/custom/ResponsiveTitle";
import ResponsiveBodyTypography from "../../components/custom/ResponsiveBodyTypography";
import { ResponsivePaper } from "../../components/custom/ResponsiveLayout";

/**
 * Page d'accueil publique du site.
 */
export default function Home() {
  const theme = useTheme();

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
          <p>
            Lorem ipsum dolor sit amet. Aut earum galisum qui iusto deserunt id
            repellat modi. Aut esse consequatur est omnis odit sed enim fuga.
            Aut aliquam libero et aspernatur numquam ut amet quae aut
            dignissimos rerum aut perspiciatis voluptate.{" "}
          </p>
          <p>
            Ut beatae adipisci a dolor fugiat eos maiores illo cum minima sunt.
            Sit autem numquam quo beatae quia eos optio harum sed cumque dolorum
            sit dolore animi. Qui corrupti vitae vel voluptatum velit id quasi
            voluptatem qui doloremque quos qui vitae corrupti sit quibusdam
            veniam.{" "}
          </p>
          <p>
            Sed dolores ducimus qui dolores atque est minus suscipit. In eveniet
            voluptatum aut placeat nobis eum corrupti delectus.{" "}
          </p>
        </ResponsiveBodyTypography>
      </ResponsivePaper>
    </>
  );
}
