export const ICON_BUTTON = {
  styleOverrides: {
    root: {
      "&.MuiIconButton-sizeMedium": {
        margin: "4px",
      },
      "&.MuiIconButton-sizeSmall": {
        padding: "6px",
        fontSize: "1.25rem",
      },
      "& .MuiSvgIcon-root": {
        fontSize: "inherit",
      },
      variants: [
        {
          props: { size: "adminMenu" as const },
          style: {
            minWidth: "0px !important",
            fontSize: "1rem",
            lineHeight: 1,
            letterSpacing: "normal",
            padding: "4px",
          },
        },
      ],
    },
  },
};
