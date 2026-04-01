export interface useEntityMutationProps {
  setSubmitSuccess?: React.Dispatch<React.SetStateAction<string>>;
  setSubmitError?: React.Dispatch<React.SetStateAction<string>>;
  setSubmitting?: React.Dispatch<React.SetStateAction<boolean>>;
  setFormDialogOpen?: React.Dispatch<React.SetStateAction<string | boolean>>;
  setInitialItem?: React.Dispatch<React.SetStateAction<any>>;
  setEditingItem?: React.Dispatch<React.SetStateAction<any>>;
  setHasChanges?: React.Dispatch<React.SetStateAction<boolean>>;
}
