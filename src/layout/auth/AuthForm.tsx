import {
  ResponsivePaper,
  ResponsiveStack,
} from "../../components/custom/ResponsiveLayout";
import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ResetPasswordLink from "../../components/account/ResetPasswordLink";
import type { AuthLayoutProps } from "../../types/authTypes";
import { useResponsiveWidth } from "../../hooks/layout/useResponsiveWidth";

export default function AuthForm({
  children,
  title,
  returnButton,
  submitButton,
  onSubmit,
  hasResetPasswordLink = false,
}: AuthLayoutProps) {
  const widthXs = useResponsiveWidth(6);
  const widthXl = useResponsiveWidth(8);

  return (
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
          xs: widthXs,
          xl: widthXl,
        },
      }}
      elevation={1}
    >
      <Typography
        variant="h5"
        component="h1"
        sx={{ textAlign: "center", width: "100%" }}
      >
        {title}
      </Typography>
      {children}
      <ResponsiveStack rowGap={3} sx={{ width: "100%", alignItems: "end" }}>
        <ResponsiveStack
          rowGap={0}
          sx={{
            flexDirection: "row",
            columnGap: 2,
            width: "100%",
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
  );
}
