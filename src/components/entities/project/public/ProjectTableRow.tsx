import {
  TableCell,
  TableRow,
  useTheme,
  type TableCellProps,
  type TableRowProps,
} from "@mui/material";
import ResponsiveTitle from "../../../custom/ResponsiveTitle";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";

function ProjectTableCell({
  children,
  ...props
}: {
  children: React.ReactNode;
} & TableCellProps) {
  return (
    <TableCell {...props} sx={{ paddingY: 6, ...props.sx }}>
      {children}
    </TableCell>
  );
}

export default function ProjectTableRow({
  merged = false,
  title,
  children,
  tableCellProps,
  ...props
}: {
  merged?: boolean;
  title?: string;
  children: React.ReactNode;
  tableCellProps?: TableCellProps;
} & TableRowProps) {
  const theme = useTheme();
  return (
    <TableRow {...props}>
      {!merged && (
        <ProjectTableCell
          sx={{
            verticalAlign: "top",
            paddingLeft: { lg: 8, md: 4 },
            paddingRight: 4,
            maxWidth: `calc(100dvw - ${theme.sizes.columnWidth(3, 2, "min(100dvw, 1920px)")}) !important`,
            borderRight: `1px solid rgb(81, 81, 81)`,
            display: { md: "table-cell", xs: "none" },
          }}
        >
          <ResponsiveTitle
            variant="h2"
            sx={{
              textAlign: "right",
              fontSize: { lg: "3.5rem", md: "2rem" },
              lineHeight: { lg: "72px", md: 1.5 },
            }}
          >
            {title}
          </ResponsiveTitle>
        </ProjectTableCell>
      )}
      <ProjectTableCell
        colSpan={merged ? 2 : 1}
        {...tableCellProps}
        sx={{
          paddingRight: { lg: 8, md: 4 },
          paddingLeft: merged ? { lg: 8, md: 4 } : 4,
          minWidth: theme.sizes.columnWidth(3, 2, "min(100dvw, 1920px)"),
          ...tableCellProps?.sx,
        }}
      >
        <ResponsiveStack rowGap={3}>
          {title && (
            <ResponsiveTitle
              variant="h2"
              sx={{
                fontSize: { lg: "3.5rem", sm: "2rem" },
                lineHeight: { lg: "72px", sm: 1.5 },
                display: { md: merged ? "block" : "none", xs: "block" },
              }}
            >
              {title}
            </ResponsiveTitle>
          )}
          {children}
        </ResponsiveStack>
      </ProjectTableCell>
    </TableRow>
  );
}
