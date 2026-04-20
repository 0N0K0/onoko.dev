import {
  ResponsivePaper,
  ResponsiveStack,
} from "../../components/custom/ResponsiveLayout";
import RootPaper from "../RootPaper";
import { useResponsiveWidth } from "../../hooks/layout/useResponsiveWidth";
import ResponsiveTitle from "../../components/custom/ResponsiveTitle";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ResetPasswordLink from "../../components/account/ResetPasswordLink";
import type { AuthLayoutProps } from "../../types/authTypes";

/**
 * Composant de layout pour les pages d'authentification (connexion, inscription, etc.)
 * Fournit une structure de base avec un titre, un formulaire et des boutons d'action
 * @param {React.ReactNode} props.children Contenu du formulaire (champs de saisie, etc.)
 * @param {string} props.title Titre de la page (ex: "Connexion", "Inscription")
 * @param {{ to: string; text: string; disabled: boolean }} props.returnButton Configuration du bouton de retour (lien, texte et état désactivé)
 * @param {{ text: string; disabled: boolean }} props.submitButton Configuration du bouton de soumission (texte et état désactivé)
 * @param {function} props.onSubmit Fonction à appeler lors de la soumission du formulaire
 * @param {boolean} props.hasResetPasswordLink Indique si le lien de réinitialisation de mot de passe doit être affiché
 */
export default function AuthLayout({
  children,
  title,
  returnButton,
  submitButton,
  onSubmit,
  hasResetPasswordLink = false,
}: AuthLayoutProps) {
  return (
    <RootPaper
      sx={{
        alignItems: "center",
        justifyContent: "center !important",
      }}
    >
      <ResponsivePaper
        component="form"
        onSubmit={onSubmit}
        paddingY={3}
        rowGap={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingX: 4,
          width: {
            xs: useResponsiveWidth(6),
            xl: useResponsiveWidth(8),
          },
        }}
        elevation={1}
      >
        <ResponsiveTitle
          variant="h5"
          component="h1"
          sx={{ textAlign: "center", width: "100%" }}
        >
          {title}
        </ResponsiveTitle>
        {children}
        <ResponsiveStack rowGap={3} width="100%" alignItems="end">
          <ResponsiveStack
            direction="row"
            rowGap={0}
            columnGap={2}
            width="100%"
            sx={{
              flexWrap: "wrap-reverse",
            }}
          >
            <Button
              variant="text"
              color="primary"
              fullWidth
              component={RouterLink}
              to={returnButton.to}
              disabled={returnButton.disabled}
              sx={{
                flex: "1 1 208px",
              }}
            >
              {returnButton.text}
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={submitButton.disabled}
              sx={{
                flex: "1 1 208px",
              }}
            >
              {submitButton.text}
            </Button>
          </ResponsiveStack>
          {hasResetPasswordLink && <ResetPasswordLink />}
        </ResponsiveStack>
      </ResponsivePaper>
    </RootPaper>
  );
}
