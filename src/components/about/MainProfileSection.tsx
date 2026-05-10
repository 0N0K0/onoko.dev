import {
  mdiEmail,
  mdiGithub,
  mdiLinkedin,
  mdiPhone,
  mdiTrayArrowDown,
} from "@mdi/js";
import CustomIconButton from "../custom/CustomIconButton";
import { ResponsiveStack } from "../custom/ResponsiveLayout";
import { Button, useTheme } from "@mui/material";
import Icon from "@mdi/react";
import { useContactForm } from "../../context/ContactFormContext";
import profil from "../../assets/images/profil.jpeg";
import { useAuthContext } from "../../context/AuthContext";

export default function MainProfileSection() {
  const theme = useTheme();
  const { isAuthenticated } = useAuthContext();

  const { openContactForm } = useContactForm();

  return (
    <ResponsiveStack
      rowGap={6}
      sx={{
        width: "fit-content",
        alignItems: "center",
        minWidth: "min(100%, 544px)",
        marginX: "auto !important",
        maxHeight: `calc(100dvh - ${isAuthenticated ? "192px" : "144px"})`,
        overflow: "hidden",
      }}
    >
      <img
        src={profil}
        style={{
          flex: "0 1 auto",
          maxWidth: "100%",
          minHeight: "0px",
          maxHeight: "432px",
          aspectRatio: "1 / 1",
          objectFit: "cover",
          borderRadius: "50%",
          border: `2px solid ${theme.palette.primary.light}`,
        }}
      />
      <ResponsiveStack rowGap={3} sx={{ width: "100%", alignItems: "center" }}>
        <ResponsiveStack direction="row" sx={{ marginX: "-12px" }}>
          <CustomIconButton icon={mdiEmail} onClick={openContactForm} />
          <CustomIconButton icon={mdiPhone} href="tel:+33632077408" />
          <CustomIconButton
            icon={mdiGithub}
            href="https://github.com/Noemie-Koelblen"
          />
          <CustomIconButton
            icon={mdiLinkedin}
            href="https://www.linkedin.com/in/no%C3%A9mie-koelblen/"
          />
        </ResponsiveStack>
        <Button
          startIcon={<Icon path={mdiTrayArrowDown} size={1} />}
          sx={{ minWidth: "208px" }}
        >
          Obtenir mon CV
        </Button>
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
