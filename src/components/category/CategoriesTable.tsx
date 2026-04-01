import type { Category } from "../../types/categoryTypes";
import CustomTable from "../entities/customTable";

export default function CategoriesTable({
  categories,
  setInitialCategory,
  setLabel,
  setEntity,
  setDescription,
  setParent,
  setFormDialogOpen,
  onClickDelete,
  submitting,
}: {
  categories: Category[];
  setInitialCategory: (category: Category | null) => void;
  setLabel: (label: string) => void;
  setEntity: (entity: string) => void;
  setDescription: (description: string) => void;
  setParent: (parentId: string) => void;
  setFormDialogOpen: (open: boolean | string) => void;
  onClickDelete: (ids: string[]) => void;
  submitting: boolean;
}) {
  const entitiesMap: { [key: string]: string } = {
    "": "",
    stack: "Technologie",
    project: "Projet",
  };

  return (
    <CustomTable
      fields={[
        { key: "label", label: "Label" },
        {
          key: "entity",
          label: "Entité",
          content: (item) => entitiesMap[item.entity || ""],
        },
      ]}
      items={categories}
      canSelect
      onClickAdd={() => setFormDialogOpen(true)}
      onClickEdit={(category) => {
        setInitialCategory(category);
        setLabel(category.label);
        setEntity(category.entity || "");
        setDescription(category.description || "");
        setParent(category.parent || "");
        setFormDialogOpen(category.id);
      }}
      onClickDelete={onClickDelete}
      submitting={submitting}
    />
  );
}
