import { createTheme, type Theme } from "@mui/material/styles";
import { BREAKPOINTS } from "./options/breakpoints";
import { PALETTE } from "./options/palette";
import { SHAPE } from "./options/shape";
import { TYPOGRAPHY } from "./options/typography";
import { SIZES } from "./options/sizes";
import { TOOLBAR } from "./components/toolbar";
import { TEXT_FIELD } from "./components/textField";
import { BUTTON } from "./components/button";
import { ICON_BUTTON } from "./components/iconButton";
import { CIRCULAR_PROGRESS } from "./components/circularProgress";
import { SNACKBAR } from "./components/snackbar";
import { ALERT } from "./components/alert";
import {
  DIALOG,
  DIALOG_ACTIONS,
  DIALOG_CONTENT,
  DIALOG_CONTENT_TEXT,
  DIALOG_TITLE,
} from "./components/dialog";
import { MENU, MENU_ITEM } from "./components/menu";
import {
  LIST,
  LIST_ITEM_BUTTON,
  LIST_ITEM_ICON,
  LIST_ITEM_TEXT,
} from "./components/list";
import { TABLE_CELL } from "./components/table";
import { FORM_HELPER_TEXT, FORM_LABEL } from "./components/form";
import { SELECT } from "./components/select";
import { INPUT_BASE, INPUT_LABEL } from "./components/input";
import { CHECKBOX } from "./components/checkbox";

// Thème personnalisé pour l'application, basé sur le thème sombre de Material-UI avec des couleurs et des typographies adaptées.
const baseTheme = createTheme({
  breakpoints: BREAKPOINTS,
  palette: PALETTE,
  shape: SHAPE,
  typography: TYPOGRAPHY,
  components: {
    MuiAlert: ALERT,
    MuiButton: BUTTON,
    MuiCheckbox: CHECKBOX,
    MuiCircularProgress: CIRCULAR_PROGRESS,
    MuiDialog: DIALOG,
    MuiDialogTitle: DIALOG_TITLE,
    MuiDialogContent: DIALOG_CONTENT,
    MuiDialogContentText: DIALOG_CONTENT_TEXT,
    MuiDialogActions: DIALOG_ACTIONS,
    MuiFormLabel: FORM_LABEL,
    MuiFormHelperText: FORM_HELPER_TEXT,
    MuiInputBase: INPUT_BASE,
    MuiInputLabel: INPUT_LABEL,
    MuiIconButton: ICON_BUTTON,
    MuiList: LIST,
    MuiListItemButton: LIST_ITEM_BUTTON,
    MuiListItemText: LIST_ITEM_TEXT,
    MuiListItemIcon: LIST_ITEM_ICON,
    MuiMenu: MENU,
    MuiMenuItem: MENU_ITEM,
    MuiSelect: SELECT,
    MuiSnackbar: SNACKBAR,
    MuiTableCell: TABLE_CELL,
    MuiTextField: TEXT_FIELD,
    MuiToolbar: TOOLBAR,
  },
});

// Injection des tailles personnalisées dans le thème
(baseTheme as any).sizes = SIZES();

const theme = baseTheme as Theme;

export default theme;
