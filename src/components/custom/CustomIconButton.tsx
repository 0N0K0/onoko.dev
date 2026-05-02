import Icon from "@mdi/react";
import { IconButton } from "@mui/material";
import type { CustomIconButtonProps } from "../../types/components/baseComponentTypes";
import { Link as RouterLink } from "react-router-dom";

export default function CustomIconButton({
  icon,
  iconSize = 1,
  href,
  ...props
}: CustomIconButtonProps) {
  const linkProps = href
    ? {
        component: href.startsWith("http") ? "a" : RouterLink,
        to: href.startsWith("http") ? undefined : href,
        href: href.startsWith("http") ? href : undefined,
        target: href.startsWith("http") ? "_blank" : undefined,
        rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
      }
    : {};
  return (
    <IconButton {...linkProps} {...props}>
      <Icon path={icon} size={iconSize} />
    </IconButton>
  );
}
