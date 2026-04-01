import {
  ResponsivePaper,
  ResponsiveStack,
} from "../../components/custom/responsiveLayout";
import RootPaper from "../rootPaper";
import { useResponsiveWidth } from "../../hooks/useResponsiveWidth";
import ResponsiveTitle from "../../components/custom/responsiveTitle";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import ResetPasswordLink from "../../components/resetPasswordLink";

export default function AuthLayout({
  children,
  title,
  returnButton,
  submitButton,
  onSubmit,
  hasResetPasswordLink = false,
}: {
  children: React.ReactNode;
  title: string;
  returnButton: {
    to: string;
    text: string;
    disabled: boolean;
  };
  submitButton: {
    text: string;
    disabled: boolean;
  };
  onSubmit?: (e: React.FormEvent) => void;
  hasResetPasswordLink?: boolean;
}) {
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
          textAlign="center"
          component="h1"
          width="100%"
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
