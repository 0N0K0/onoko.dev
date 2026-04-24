import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useDroppable } from "@dnd-kit/core";
import type { Category } from "../../../types/entities/categoryTypes";
import { useState } from "react";
import { mdiChevronDown, mdiChevronUp } from "@mdi/js";
import ResponsiveBodyTypography from "../../custom/ResponsiveBodyTypography";
import CustomIconButton from "../../custom/CustomIconButton";

export const MEDIA_FILTER_ALL = "all";
export const MEDIA_FILTER_UNCATEGORIZED = "uncategorized";
export const MEDIA_CATEGORY_DROP_PREFIX = "media-category-drop-";
export const MEDIA_UNCATEGORIZED_DROP_ID = "media-category-drop-uncategorized";

export function getMediaCategoryDropId(categoryId: string): string {
  return `${MEDIA_CATEGORY_DROP_PREFIX}${categoryId}`;
}

function CategoryFilterButton({
  id,
  label,
  selected,
  selectedFilter,
  onSelectFilter,
  onClick,
  depth = 0,
  count,
  counts,
  droppableId,
  dropEnabled,
  children,
}: {
  id?: string;
  label: string;
  selected: boolean;
  selectedFilter?: string;
  onSelectFilter?: (value: string) => void;
  onClick: () => void;
  depth?: number;
  count: number;
  counts?: Record<string, number>;
  droppableId?: string;
  dropEnabled?: boolean;
  children?: Category[];
}) {
  const { setNodeRef } = useDroppable({
    id: droppableId || "",
    disabled: !dropEnabled || !droppableId,
  });

  // Calcule le total des médias pour la catégorie courante et tous ses enfants
  function getTotalCount(categoryId: string, children?: Category[]): number {
    const selfCount = counts ? counts[categoryId] || 0 : 0;
    if (!children || children.length === 0) return selfCount;
    return (
      selfCount +
      children.reduce(
        (sum, child) => sum + getTotalCount(child.id, child.children),
        0,
      )
    );
  }

  const [open, setOpen] = useState(false);

  return (
    <>
      <ListItem
        disablePadding
        ref={dropEnabled && droppableId ? setNodeRef : undefined}
      >
        <ListItemButton
          selected={selected}
          sx={{
            padding: `12px 0 12px ${(depth + 1) * 16}px !important`,
            gap: 0,
          }}
          onClick={onClick}
        >
          <ListItemText
            sx={{
              "& .MuiListItemText-primary": {
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              },
            }}
          >
            <ResponsiveBodyTypography
              variant="bodySm"
              style={{
                flex: "0 1 auto",
                display: "block",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {label}
            </ResponsiveBodyTypography>
            <ResponsiveBodyTypography
              variant="bodySm"
              style={{ display: "block", whiteSpace: "nowrap" }}
            >
              {count}
              {children?.length && id
                ? ` / ${getTotalCount(id, children)}`
                : ""}
            </ResponsiveBodyTypography>
          </ListItemText>
          {children?.length ? (
            <CustomIconButton
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
              icon={open ? mdiChevronUp : mdiChevronDown}
            />
          ) : (
            <div style={{ width: "48px" }}></div>
          )}
        </ListItemButton>
      </ListItem>
      {children?.length ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children?.map((child) => (
            <CategoryFilterButton
              id={child.id}
              label={child.label}
              selected={selectedFilter === child.id}
              selectedFilter={selectedFilter}
              onSelectFilter={onSelectFilter}
              onClick={() => onSelectFilter?.(child.id)}
              depth={(child.depth || 0) + 1}
              counts={counts}
              count={counts ? counts[child.id] || 0 : 0}
              droppableId={getMediaCategoryDropId(child.id)}
              dropEnabled={dropEnabled}
              children={child.children}
            />
          ))}
        </Collapse>
      ) : null}
    </>
  );
}

export default function MediaCategorySidebar({
  categories,
  selectedFilter,
  onSelectFilter,
  counts,
  enableDrop = true,
}: {
  categories: Category[] | undefined;
  selectedFilter: string;
  onSelectFilter: (value: string) => void;
  counts: {
    all: number;
    uncategorized: number;
    byCategoryId: Record<string, number>;
  };
  enableDrop?: boolean;
}) {
  console.log(counts);
  const theme = useTheme();

  function buildCategoryTree(): (Category & { children: Category[] })[] {
    const mediaCategories =
      categories?.filter((c) => c.entity === "media") || [];
    const categoryMap: Record<string, Category & { children: Category[] }> = {};
    mediaCategories.forEach((cat) => {
      categoryMap[cat.id] = { ...cat, children: [] };
    });
    const roots: (Category & { children: Category[] })[] = [];
    mediaCategories.forEach((cat) => {
      if (cat.parent && categoryMap[cat.parent]) {
        categoryMap[cat.parent].children.push(categoryMap[cat.id]);
      } else {
        roots.push(categoryMap[cat.id]);
      }
    });
    return roots;
  }

  const categoriesTree = buildCategoryTree();

  return (
    <List
      sx={{
        flex: "0 0 280px",
        borderRight: `1px solid ${theme.palette.divider}`,
        overflowY: "auto",
        overflowX: "hidden",
        maxHeight: "100%",
        // paddingRight: 2,
        // paddingBottom: 1,
      }}
    >
      <CategoryFilterButton
        label="Tous les médias"
        selected={selectedFilter === MEDIA_FILTER_ALL}
        onClick={() => onSelectFilter(MEDIA_FILTER_ALL)}
        count={counts.all}
      />
      <CategoryFilterButton
        label="Sans catégorie"
        selected={selectedFilter === MEDIA_FILTER_UNCATEGORIZED}
        onClick={() => onSelectFilter(MEDIA_FILTER_UNCATEGORIZED)}
        count={counts.uncategorized}
        droppableId={MEDIA_UNCATEGORIZED_DROP_ID}
        dropEnabled={enableDrop}
      />
      <Divider />
      {categoriesTree.map((category) => (
        <CategoryFilterButton
          id={category.id}
          label={category.label}
          selected={selectedFilter === category.id}
          selectedFilter={selectedFilter}
          onSelectFilter={onSelectFilter}
          onClick={() => onSelectFilter(category.id)}
          depth={category.depth || 0}
          count={counts.byCategoryId[category.id] || 0}
          counts={counts.byCategoryId}
          droppableId={getMediaCategoryDropId(category.id)}
          dropEnabled={enableDrop}
          children={category.children}
        />
      ))}
    </List>
  );
}
