import { useTheme } from "@mui/material";
import ResponsiveTitle from "../../components/responsiveTitle";
import ResponsiveBodyTypography from "../../components/responsiveBodyTypography";
import { ResponsivePaper } from "../../components/ResponsiveLayout";

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
          <p>
            Et unde molestias ad provident consequatur qui saepe dolor non earum
            iusto quo aliquid sapiente. Sed consequatur dolore qui nihil
            nesciunt et molestiae ducimus? Hic possimus dolore quo labore
            perferendis ad facilis dolorem quo sapiente quam eos maxime
            doloremque?{" "}
          </p>
          <p>
            Aut velit dicta cum numquam quibusdam est corrupti natus in error
            voluptatibus non ipsa quasi sed accusantium delectus. Et voluptate
            mollitia vel voluptatum accusantium et ullam expedita in odio
            galisum ex odio obcaecati ut doloribus adipisci. Ut possimus
            consectetur sed omnis dolore sed voluptatum aperiam ut quas rerum id
            dolores molestiae ut nulla consequatur est eveniet esse. In
            voluptatem quia eum quos voluptatem et sapiente corporis hic galisum
            aliquam et quod cumque et quidem ipsum At libero quod?{" "}
          </p>
          <p>
            In voluptates internos non nisi natus aut reprehenderit aperiam in
            magnam debitis. Sit voluptatem assumenda eos unde fugit qui enim
            corporis a mollitia dolor sed ullam iste non eius nemo est
            voluptatem maiores. Vel amet maxime et dolores excepturi rem
            asperiores magnam ex necessitatibus galisum sed voluptatum
            nihil.{" "}
          </p>
        </ResponsiveBodyTypography>
      </ResponsivePaper>
    </>
  );
}
