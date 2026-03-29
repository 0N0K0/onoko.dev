import { Menu, type MenuProps } from "@mui/material";

export default function CustomMenu(props: MenuProps & { PaperProps?: any }) {
  // Fusionner les slotProps pour permettre la surcharge
  const slotProps = {
    paper: {
      elevation: 2,
      ...(props.PaperProps || {}),
    },
  };
  return (
    <Menu marginThreshold={8} {...props} slotProps={slotProps}>
      {props.children}
    </Menu>
  );
}
