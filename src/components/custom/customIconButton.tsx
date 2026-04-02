import Icon from "@mdi/react";
import { IconButton } from "@mui/material";

export default function CustomIconButton({
  icon,
  iconSize = 1,
  ...props
}: any) {
  return (
    <IconButton {...props}>
      <Icon path={icon} size={iconSize} />
    </IconButton>
  );
}
