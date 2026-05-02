import { useMutation } from "@apollo/client/react";
import type {
  DocumentNode,
  ApolloCache,
  OperationVariables,
} from "@apollo/client";
import type { useMutation as UseMutationType } from "@apollo/client/react";

export interface EntityMutationSlice<TVariables extends OperationVariables> {
  mutate: UseMutationType.MutationFunction<boolean, TVariables, ApolloCache>;
  data: boolean | null | undefined;
  loading: boolean;
  error: { message?: string } | undefined;
}

export interface EntityMutationsReturn<
  TCreate extends OperationVariables,
  TEdit extends OperationVariables,
> {
  create: EntityMutationSlice<TCreate>;
  edit: EntityMutationSlice<TEdit>;
  delete: EntityMutationSlice<{ id: string }>;
}

export default function useEntityMutations<
  TCreate extends OperationVariables = Record<string, unknown>,
  TEdit extends OperationVariables = {
    id: string;
    input: Record<string, unknown>;
  },
>(
  createMutation: DocumentNode,
  updateMutation: DocumentNode,
  deleteMutation: DocumentNode,
): EntityMutationsReturn<TCreate, TEdit> {
  const [
    createMutate,
    { data: createData, loading: createLoading, error: createError },
  ] = useMutation<boolean, TCreate>(createMutation);

  const [
    editMutate,
    { data: editData, loading: editLoading, error: editError },
  ] = useMutation<boolean, TEdit>(updateMutation);

  const [
    deleteMutate,
    { data: deleteData, loading: deleteLoading, error: deleteError },
  ] = useMutation<boolean, { id: string }>(deleteMutation);

  return {
    create: {
      mutate: createMutate,
      data: createData,
      loading: createLoading,
      error: createError,
    },
    edit: {
      mutate: editMutate,
      data: editData,
      loading: editLoading,
      error: editError,
    },
    delete: {
      mutate: deleteMutate,
      data: deleteData,
      loading: deleteLoading,
      error: deleteError,
    },
  };
}
