import { TextField } from "@mui/material";
import { ResponsiveStack } from "../../../custom/ResponsiveLayout";
import ResponsiveTitle from "../../../custom/ResponsiveTitle";
import WysiwygField from "../../../custom/WysiwygField";
import CustomSelect from "../../../custom/CustomSelect";
import FieldsRepeater from "../../../custom/FieldsRepeater";
import { DatePicker } from "@mui/x-date-pickers";
import type { Role } from "../../../../types/entities/roleTypes";
import type { Coworker } from "../../../../types/entities/coworkerTypes";
import type { Stack } from "../../../../types/entities/stackTypes";
import { extractIds } from "../../../../utils/normalizeRef";
import {
  getMultiSelectValue,
  getSelectValue,
} from "../../../../utils/normalizeRef";
import type { ProjectSectionProps } from "../../../../types/entities/projectTypes";

interface Props extends ProjectSectionProps {
  roles: Role[];
  coworkers: Coworker[];
  stacks: Stack[];
}

export default function ProjectOrganizationSection({
  editingProject,
  setEditingProject,
  initialProject,
  setHasChanges,
  roles,
  coworkers,
  stacks,
}: Props) {
  return (
    <>
      {/* Organisation */}
      <ResponsiveStack rowGap={3}>
        <ResponsiveTitle variant="h6" component="h3">
          Gestion de projet
        </ResponsiveTitle>
        <ResponsiveStack
          sx={{ flexDirection: "row", columnGap: 2, alignItems: "center" }}
        >
          <DatePicker
            label="Date de début"
            views={["year", "month"]}
            format="MM/YYYY"
            sx={{ flex: "1 1 208px" }}
            value={editingProject?.startDate ?? null}
            onChange={(date) => {
              setEditingProject((prev) =>
                prev ? { ...prev, startDate: date ?? undefined } : null,
              );
              date?.valueOf() !== initialProject?.startDate?.valueOf() &&
                setHasChanges(true);
            }}
          />
          <DatePicker
            label="Date de fin"
            views={["year", "month"]}
            format="MM/YYYY"
            minDate={editingProject?.startDate ?? undefined}
            sx={{ flex: "1 1 208px" }}
            value={editingProject?.endDate ?? null}
            onChange={(date) => {
              setEditingProject((prev) =>
                prev ? { ...prev, endDate: date ?? undefined } : null,
              );
              date?.valueOf() !== initialProject?.endDate?.valueOf() &&
                setHasChanges(true);
            }}
          />
        </ResponsiveStack>
        <TextField
          label="Temps de travail"
          value={editingProject?.organization?.workload || ""}
          onChange={(e) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    organization: {
                      ...prev.organization,
                      workload: e.target.value,
                    },
                  }
                : null,
            );
            e.target.value !== (initialProject?.organization?.workload || "") &&
              setHasChanges(true);
          }}
        />
        <CustomSelect
          label="Rôles"
          labelId="roles-label"
          value={extractIds(editingProject?.roles)}
          onChange={(e) => {
            const value = getMultiSelectValue(e);
            setEditingProject((prev) =>
              prev ? { ...prev, roles: value } : prev,
            );
            const initial = extractIds(initialProject?.roles);
            JSON.stringify([...initial].sort()) !==
              JSON.stringify([...value].sort()) && setHasChanges(true);
          }}
          options={roles.map((r) => ({ id: r.id, label: r.label }))}
        />
        <FieldsRepeater
          label={{ title: "Intervenant", add: "un intervenant" }}
          editingItem={editingProject as unknown as Record<string, unknown>}
          values="coworkers"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setEditingItem={setEditingProject as any}
          setHasChanges={setHasChanges}
          fields={(item, idx, onChange, onChangeField) => (
            <>
              <CustomSelect
                label="Intervenant"
                labelId={`coworker-${idx}-label`}
                value={typeof item.id === "string" ? item.id : ""}
                onChange={(e) => {
                  onChange({ ...item, id: getSelectValue(e) });
                }}
                options={coworkers.map((c) => ({ id: c.id, label: c.name }))}
              />
              <CustomSelect
                label="Rôles"
                labelId={`coworker-${idx}-roles-label`}
                value={extractIds(item.roles)}
                onChange={(e) => {
                  const newRoles = getMultiSelectValue(e);
                  onChangeField("roles", newRoles);
                  const initial = extractIds(
                    initialProject?.coworkers?.[idx]?.roles,
                  );
                  JSON.stringify([...initial].sort()) !==
                    JSON.stringify([...newRoles].sort()) && setHasChanges(true);
                }}
                options={(() => {
                  const selected = coworkers.find((c) => c.id === item.id);
                  return (selected?.roles ?? [])
                    .map((r) =>
                      typeof r === "string"
                        ? roles.find((role) => role.id === r)
                        : r,
                    )
                    .filter((r): r is Role => !!r)
                    .map((r) => ({ id: r.id, label: r.label }));
                })()}
              />
            </>
          )}
        />
        <WysiwygField
          label="Anticipation des risques"
          value={editingProject?.organization?.anticipation || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    organization: { ...prev.organization, anticipation: val },
                  }
                : null,
            );
            val !== (initialProject?.organization?.anticipation || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Méthodologie"
          value={editingProject?.organization?.methodology || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    organization: { ...prev.organization, methodology: val },
                  }
                : null,
            );
            val !== (initialProject?.organization?.methodology || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Evolutions"
          value={editingProject?.organization?.evolution || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    organization: { ...prev.organization, evolution: val },
                  }
                : null,
            );
            val !== (initialProject?.organization?.evolution || "") &&
              setHasChanges(true);
          }}
        />
        <WysiwygField
          label="Modalités de validation"
          value={editingProject?.organization?.validation || ""}
          onChange={(val) => {
            setEditingProject((prev) =>
              prev
                ? {
                    ...prev,
                    organization: { ...prev.organization, validation: val },
                  }
                : null,
            );
            val !== (initialProject?.organization?.validation || "") &&
              setHasChanges(true);
          }}
        />
      </ResponsiveStack>

      {/* Stacks */}
      <FieldsRepeater
        label={{ title: "Technologie", add: "une technologie" }}
        editingItem={editingProject as unknown as Record<string, unknown>}
        values="stacks"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setEditingItem={setEditingProject as any}
        setHasChanges={setHasChanges}
        fields={(item, idx, onChange) => (
          <>
            <CustomSelect
              label="Technologie"
              labelId={`stack-${idx}-label`}
              value={typeof item.id === "string" ? item.id : ""}
              onChange={(e) => {
                onChange({ ...item, id: getSelectValue(e) });
              }}
              options={stacks.map((s) => ({ id: s.id, label: s.label }))}
            />
            <CustomSelect
              label="Version"
              labelId={`stack-${idx}-version-label`}
              value={typeof item.version === "string" ? item.version : ""}
              onChange={(e) => {
                onChange({ ...item, version: getSelectValue(e) });
              }}
              options={(
                stacks.find((s) => s.id === item.id)?.versions ?? []
              ).map((v) => ({ id: v, label: v }))}
            />
            <TextField
              label="Section"
              value={typeof item.section === "string" ? item.section : ""}
              onChange={(e) => {
                onChange({ ...item, section: e.target.value });
              }}
            />
          </>
        )}
      />
    </>
  );
}
