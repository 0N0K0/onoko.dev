import type { SelectChangeEvent } from "@mui/material";

/**
 * Resolves a reference to its full object form.
 * - If `ref` is already an object, returns it unchanged.
 * - If `ref` is a string ID, finds and returns the matching item from `list`.
 * - Returns `undefined` if `ref` is null/undefined or the ID is not found.
 */
export function normalizeRef<T extends { id: string }>(
  ref: string | T | null | undefined,
  list: T[],
): T | undefined {
  if (ref == null) return undefined;
  if (typeof ref === "string") return list.find((item) => item.id === ref);
  return ref;
}

/**
 * Resolves an array of mixed string-ID / object references to full objects.
 * Entries that cannot be resolved are filtered out.
 */
export function normalizeRefs<T extends { id: string }>(
  refs: (string | T)[],
  list: T[],
): T[] {
  return refs.flatMap((ref) => {
    const resolved = normalizeRef(ref, list);
    return resolved !== undefined ? [resolved] : [];
  });
}

/**
 * Extracts the ID from a reference that may be a string ID or an object with an `id` field.
 */
export function extractId<T extends { id: string }>(
  ref: string | T | null | undefined,
): string | undefined {
  if (ref == null) return undefined;
  if (typeof ref === "string") return ref;
  return ref.id;
}

/**
 * Extracts IDs from an array of mixed string-ID / object references.
 */
export function extractIds<T extends { id: string }>(
  refs: (string | T)[] | null | undefined,
): string[] {
  if (!refs) return [];
  return refs.map(extractId).filter((id): id is string => id !== undefined);
}

/**
 * Extracts a scalar string value from a MUI SelectChangeEvent.
 * Returns the first element when the value is an array (single-select fallback).
 */
export function getSelectValue(
  e: SelectChangeEvent<string | string[]>,
): string {
  const { value } = e.target;
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

/**
 * Extracts an array of string values from a MUI SelectChangeEvent (multi-select).
 */
export function getMultiSelectValue(
  e: SelectChangeEvent<string | string[]>,
): string[] {
  const { value } = e.target;
  if (Array.isArray(value)) return value;
  return value != null ? [value] : [];
}
