import { TextField, Button } from "@mui/material";
import {
  ResponsivePaper,
  ResponsiveStack,
} from "../../components/ResponsiveLayout";
import RootPaper from "../../layout/rootPaper";
import ResponsiveTitle from "../../components/responsiveTitle";
import { Link as RouterLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../../constants/apiConstants";

export default function ResetPassword() {
  return (
    <RootPaper
      sx={{
        alignItems: "center",
        justifyContent: "center !important",
      }}
    >
      <ResponsivePaper
        component="form"
        paddingY={3}
        rowGap={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingX: 4,
          width: "calc((100% - 15 * 16px) / 12 * 4 + 5 * 16px)", // 4 columns + 3 gaps
        }}
        elevation={1}
      >
        <ResponsiveTitle
          variant="h5"
          textAlign="center"
          component="h1"
          width="100%"
        >
          Réinitialiser mon mot de passe
        </ResponsiveTitle>
        <ResponsiveStack rowGap={3} width="100%">
          <TextField label="Adresse e-mail" fullWidth type="email" />
        </ResponsiveStack>
        <ResponsiveStack rowGap={3} width="100%" alignItems="end">
          <ResponsiveStack
            direction="row"
            rowGap={2}
            columnGap={2}
            width="100%"
          >
            <Button
              color="primary"
              fullWidth
              sx={{ textWrap: "nowrap" }}
              component={RouterLink}
              to={`/${LOGIN_ROUTE}`}
            >
              Revenir à la page de connexion
            </Button>
            <Button variant="contained" color="primary" fullWidth>
              Réinitialiser
            </Button>
          </ResponsiveStack>
        </ResponsiveStack>
      </ResponsivePaper>
    </RootPaper>
  );
}
