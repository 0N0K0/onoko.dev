import {
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useMedia } from "../../../hooks/useMedia";
import SnackbarAlert from "../../custom/SnackbarAlert";
import MediaDropZone from "./MediaDropZone";
import ResponsiveTitle from "../../custom/ResponsiveTitle";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiPlus, mdiViewGrid, mdiViewList } from "@mdi/js";
import MediaGrid from "./MediaGrid";
import CustomTable from "../../custom/CustomTable";
import Picture from "../../custom/Picture";
import SingleMediaDialog from "./SingleMediaDialog";
import useMediaMutations from "../../../hooks/mutations/useMediaMutations";

export default function MediaLibrary({
  submitting,
  setSubmitting,
  setSubmitSuccess,
  setSubmitError,
}: {
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitSuccess: React.Dispatch<React.SetStateAction<string>>;
  setSubmitError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { medias, setMedias, loading, itemsError } = useMedia();

  const [addMedias, setAddMedias] = useState<boolean>(false);

  const [openMediaDialog, setOpenMediaDialog] = useState<string | false>(false);

  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const { handleAdd, handleEdit, handleDelete } = useMediaMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    medias,
    setMedias,
  });

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
        maxWidth="100% !important"
      >
        <ResponsiveTitle variant="h1">Médias</ResponsiveTitle>
        <Button
          onClick={() => setAddMedias(true)}
          startIcon={<Icon path={mdiPlus} size={1} />}
          sx={{ marginLeft: "auto" }}
        >
          Importer des médias
        </Button>
        <ToggleButtonGroup>
          <ToggleButton
            value="grid"
            aria-label="grid view"
            onClick={() => setLayout("grid")}
            selected={layout === "grid"}
          >
            <Icon path={mdiViewGrid} size={1} />
          </ToggleButton>
          <ToggleButton
            value="list"
            aria-label="list view"
            onClick={() => setLayout("list")}
            selected={layout === "list"}
          >
            <Icon path={mdiViewList} size={1} />
          </ToggleButton>
        </ToggleButtonGroup>
      </ResponsiveStack>
      {medias?.length === 0 || !medias || addMedias ? (
        <MediaDropZone handleAdd={handleAdd} submitting={submitting} />
      ) : null}
      {loading ? (
        <CircularProgress />
      ) : (
        medias &&
        medias.length > 0 &&
        (layout === "grid" ? (
          <MediaGrid medias={medias} />
        ) : (
          // @TODO: MediaList component
          <CustomTable
            fields={[
              {
                key: "id",
                label: "Miniature",
                content: (media: any) => (
                  <Picture image={media} maxWidth="3rem" maxHeight="3rem" />
                ),
              },
              {
                key: "label",
                label: "Label",
              },
              {
                key: "category",
                label: "Catégorie",
                content: (media: any) =>
                  typeof media.category === "string"
                    ? media.category
                    : media.category?.label || "",
              },
            ]}
            items={medias}
            canSelect
            onClickAdd={() => setAddMedias(true)}
            onClickEdit={(mediaId: string) => setOpenMediaDialog(mediaId)}
            onClickDelete={(selectedMedias: string[]) =>
              handleDelete(selectedMedias)
            }
            submitting={submitting}
          />
        ))
      )}
      <SnackbarAlert
        open={!!itemsError}
        message={itemsError || "Une erreur est survenue"}
        severity="error"
      />
      <SingleMediaDialog
        medias={medias}
        open={openMediaDialog}
        setOpen={setOpenMediaDialog}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        submitting={submitting}
      />
    </>
  );
}
