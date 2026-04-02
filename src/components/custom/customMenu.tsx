import { Menu, type MenuProps } from "@mui/material";

/**
 * Composant de menu personnalisé utilisant MUI Menu
 * Permet de fusionner les slotProps pour personnaliser le style du papier du menu
 * @param {MenuProps} props Propriétés du menu, avec une option PaperProps pour personnaliser le style du papier
 */
export default function CustomMenu(props: MenuProps & { PaperProps?: any }) {
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
