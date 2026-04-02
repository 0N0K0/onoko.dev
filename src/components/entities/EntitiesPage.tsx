import { useEffect, useState } from "react";
import apolloClient from "../../services/appolloClient";
import { ResponsiveStack } from "../custom/responsiveLayout";
import ResponsiveTitle from "../custom/responsiveTitle";
import { Button, CircularProgress } from "@mui/material";
import Icon from "@mdi/react";
import { mdiPlus } from "@mdi/js";
import CustomTable from "../custom/customTable";
import ClosableSnackbarAlert from "../custom/closableSnackbarAlert";
import SnackbarAlert from "../custom/snackbarAlert";
import type { EntitiesPageProps } from "../../types/entityTypes";

export default function EntitiesPage({
  labels,
  items,
  setItems,
  query,
  fields,
  onClickActions,
  submitting,
  submitSuccess,
  setSubmitSuccess,
  submitError,
}: EntitiesPageProps) {
  const [loading, setLoading] = useState(true);
  const [itemsError, setItemsError] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    setItemsError("");
    try {
      const { data } = await apolloClient.query<{ [key: string]: any[] }>({
        query,
        fetchPolicy: "no-cache",
      });
      setItems(data ? data[labels.entity] : []);
    } catch (e: any) {
      setItemsError(e.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <>
      <ResponsiveStack
        direction="row"
        rowGap={3}
        columnGap={2}
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        flexWrap="wrap"
      >
        <ResponsiveTitle variant="h1">{labels.title}</ResponsiveTitle>
        {items && items.length === 0 && (
          <Button
            onClick={() => onClickActions.add()}
            startIcon={<Icon path={mdiPlus} size={1} />}
            sx={{ marginX: "auto" }}
          >
            {labels.addButton}
          </Button>
        )}
      </ResponsiveStack>
      {loading ? (
        <CircularProgress />
      ) : (
        items &&
        items.length > 0 && (
          <CustomTable
            fields={fields}
            items={items}
            canSelect
            onClickAdd={() => onClickActions.add()}
            onClickEdit={onClickActions.edit}
            onClickDelete={(selectedItems: string[]) =>
              onClickActions.delete(selectedItems)
            }
            submitting={submitting}
          />
        )
      )}
      <ClosableSnackbarAlert
        open={!!submitSuccess}
        setOpen={() => setSubmitSuccess("")}
        message={submitSuccess}
        severity="success"
      />
      <SnackbarAlert
        open={!!submitError || !!itemsError}
        message={itemsError || submitError || "Une erreur est survenue"}
        severity="error"
      />
    </>
  );
}
