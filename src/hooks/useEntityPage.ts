import { useEffect, useState } from "react";
import type {
  MutationState,
  UseEntityPageOptions,
  UseEntityPageReturn,
} from "../types/entities/entityTypes";

export default function useEntityPage({
  query,
  mutations,
  messages,
}: UseEntityPageOptions): UseEntityPageReturn {
  const [submitSuccess, setSubmitSuccess] = useState("");
  const [formDialogOpen, setFormDialogOpen] = useState<string | boolean>(false);

  const handleMutationEffect = (
    mutation: MutationState,
    message: string,
    closeDialog: boolean,
  ) => {
    if (!mutation.loading && mutation.data) {
      setSubmitSuccess(message);
      if (closeDialog) setFormDialogOpen(false);
      query.refetch();
    }
  };

  useEffect(() => {
    handleMutationEffect(mutations.create, messages.create, true);
  }, [mutations.create.data]);
  useEffect(() => {
    handleMutationEffect(mutations.edit, messages.edit, true);
  }, [mutations.edit.data]);
  useEffect(() => {
    handleMutationEffect(mutations.delete, messages.delete, false);
  }, [mutations.delete.data]);

  const submitting =
    mutations.create.loading ||
    mutations.edit.loading ||
    mutations.delete.loading;

  const errorMessage =
    query.error?.message ||
    mutations.create.error?.message ||
    mutations.edit.error?.message ||
    mutations.delete.error?.message ||
    "";

  return {
    contentProps: {
      onClickActions: {
        add: () => setFormDialogOpen(true),
        edit: (id: string) => setFormDialogOpen(id),
        delete: mutations.delete.mutate,
      },
      submitting,
      submitSuccess,
      setSubmitSuccess,
      error: errorMessage,
    },
    formDialogProps: {
      open: formDialogOpen,
      setOpen: setFormDialogOpen,
      handleAdd: mutations.create.mutate,
      handleEdit: mutations.edit.mutate,
      submitting,
    },
  };
}
