import {
  Button,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import type { Category } from "../../types/categoryTypes";
import { ResponsiveStack } from "../custom/responsiveLayout";
import Icon from "@mdi/react";
import { mdiDelete, mdiPencil, mdiPlus } from "@mdi/js";

export default function CategoriesTable({
  categories,
  selectedCategories,
  setSelectedCategories,
  handleSelectMultiple,
  setInitialCategory,
  setLabel,
  setEntity,
  setDescription,
  setParent,
  setFormDialogOpen,
  setDeleteDialogOpen,
  submitting,
}: {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: (ids: string[]) => void;
  handleSelectMultiple: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setInitialCategory: (category: Category | null) => void;
  setLabel: (label: string) => void;
  setEntity: (entity: string) => void;
  setDescription: (description: string) => void;
  setParent: (parentId: string) => void;
  setFormDialogOpen: (open: boolean | string) => void;
  setDeleteDialogOpen: (open: boolean) => void;
  submitting: boolean;
}) {
  const theme = useTheme();
  const entitiesMap: { [key: string]: string } = {
    "": "",
    stack: "Technologie",
    project: "Projet",
  };
  return (
    <TableContainer sx={{ flex: "1 1 auto", minHeight: 0 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }}>
              <Checkbox
                indeterminate={
                  selectedCategories.length > 0 &&
                  selectedCategories.length < (categories?.length || 0)
                }
                checked={
                  categories?.length > 0 &&
                  selectedCategories.length === categories.length
                }
                onChange={handleSelectMultiple}
              />
            </TableCell>
            <TableCell>Label</TableCell>
            <TableCell>Entité</TableCell>
            <TableCell sx={{ width: "1%", whiteSpace: "nowrap" }}>
              <ResponsiveStack
                direction="row"
                rowGap={0}
                columnGap={1}
                width="100%"
                justifyContent="flex-end"
              >
                <IconButton
                  disabled={submitting}
                  onClick={() => setFormDialogOpen(true)}
                  color="primary"
                >
                  <Icon path={mdiPlus} size={1}></Icon>
                </IconButton>
              </ResponsiveStack>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <Checkbox
                  checked={selectedCategories.includes(category.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([
                        ...selectedCategories,
                        category.id,
                      ]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((id) => id !== category.id),
                      );
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                {" "}
                {category.depth ? "__".repeat(category.depth) : ""}{" "}
                {category.label}
              </TableCell>
              <TableCell>
                {category.entity ? entitiesMap[category.entity] : ""}
              </TableCell>
              <TableCell>
                <ResponsiveStack
                  direction="row"
                  rowGap={0}
                  columnGap={0}
                  width="100%"
                  justifyContent="flex-end"
                >
                  <IconButton
                    color="primary"
                    disabled={submitting}
                    onClick={() => {
                      setInitialCategory(category);
                      setLabel(category.label);
                      setEntity(category.entity || "");
                      setDescription(category.description || "");
                      setParent(category.parent || "");
                      setFormDialogOpen(category.id);
                    }}
                  >
                    <Icon path={mdiPencil} size={1}></Icon>
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setSelectedCategories([category.id]);
                      setDeleteDialogOpen(true);
                    }}
                    disabled={submitting}
                  >
                    <Icon path={mdiDelete} size={1}></Icon>
                  </IconButton>
                </ResponsiveStack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter
          sx={{
            position: "sticky",
            bottom: 0,
            backgroundColor: theme.palette.background.paper,
            display:
              selectedCategories.length > 1 ? "table-footer-group" : "none",
          }}
        >
          <TableRow sx={{}}>
            <TableCell
              colSpan={4}
              align="right"
              sx={{ borderTop: `1px solid rgba(81, 81, 81, 1)` }}
            >
              <Button
                color="error"
                startIcon={<Icon path={mdiDelete} size={1} />}
                onClick={() => setDeleteDialogOpen(true)}
                disabled={selectedCategories.length <= 1 || submitting}
              >
                Supprimer les catégories sélectionnées
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
