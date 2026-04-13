import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import { ResponsiveBox, ResponsiveStack } from "../../custom/ResponsiveLayout";
import Icon from "@mdi/react";
import { mdiCheckboxMultipleMarkedOutline, mdiClose, mdiDelete } from "@mdi/js";
import { useState } from "react";
import type { Media } from "../../../types/entities/mediaTypes";
import Picture from "../../custom/Picture";
import DeleteConfirmationDialog from "../DeleteConfirmationDialog";
import type { useMutation } from "@apollo/client/react";
import type { ApolloCache } from "@apollo/client";

export default function MediaGrid({
  medias,
  setOpenDialog,
  onDelete,
  submitting,
}: {
  medias: Media[];
  setOpenDialog: React.Dispatch<React.SetStateAction<string | false>>;
  onDelete: useMutation.MutationFunction<boolean, { id: string }, ApolloCache>;
  submitting: boolean;
}) {
  const theme = useTheme();

  const [select, setSelect] = useState<boolean>(false);
  const [selectedMedias, setSelectedMedias] = useState<string[]>([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const paths: { [key: string]: string } = {
    xl: "",
    l: "",
    m: "",
    s: "",
    xs: "",
  };

  return (
    <>
      <ResponsiveStack
        rowGap={3}
        sx={{
          overflowY: "auto",
          overflowX: "auto",
          height: "100%",
          paddingX: "32px !important",
          marginX: "-32px !important",
          width: "calc(100% + 64px)",
        }}
        maxWidth="calc(100% + 64px) !important"
      >
        <ResponsiveStack
          direction="row"
          rowGap={3}
          columnGap={2}
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          flexWrap="wrap-reverse"
          maxWidth="100% !important"
        >
          {select && (
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedMedias.length === medias.length}
                  indeterminate={
                    selectedMedias.length > 0 &&
                    selectedMedias.length < medias.length
                  }
                  onChange={(e) =>
                    setSelectedMedias(
                      e.target.checked ? medias.map((m) => m.id) : [],
                    )
                  }
                />
              }
              label="Sélectionner tout"
            />
          )}
          <Button
            startIcon={
              <Icon
                path={select ? mdiClose : mdiCheckboxMultipleMarkedOutline}
                size={1}
              />
            }
            variant="outlined"
            onClick={() => {
              setSelect((prev) => !prev);
              setSelectedMedias([]);
            }}
            sx={{ marginLeft: "auto" }}
          >
            Sélection multiple
          </Button>
        </ResponsiveStack>
        <ResponsiveBox
          rowGap={3}
          columnGap={4}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(6rem, 1fr))",
            overflowY: "auto",
            overflowX: "hidden",
            paddingX: "32px !important",
            marginX: "-32px !important",
            width: "calc(100% + 64px)",
          }}
          maxWidth="calc(100% + 64px) !important"
        >
          {medias.map((media) => {
            for (const key in paths) {
              if (media.type === "webp") {
                paths[key] = media.path.replace(/\.webp$/, `_${key}.webp`);
              }
            }
            return (
              <Box
                key={`${media.id}-container`}
                sx={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  border: `${select && selectedMedias.includes(media.id) ? "2px" : "1px"} solid ${select && selectedMedias.includes(media.id) ? theme.palette.primary.main : theme.palette.divider}`,
                  borderRadius: 1,
                  padding: 1,
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (select) {
                    if (selectedMedias.includes(media.id)) {
                      setSelectedMedias((prev) =>
                        prev.filter((id) => id !== media.id),
                      );
                    } else {
                      setSelectedMedias((prev) => [...prev, media.id]);
                    }
                  } else {
                    setOpenDialog(media.id);
                  }
                }}
              >
                <Picture image={media} />
                {select && (
                  <Checkbox
                    checked={selectedMedias.includes(media.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMedias((prev) => [...prev, media.id]);
                      } else {
                        setSelectedMedias((prev) =>
                          prev.filter((id) => id !== media.id),
                        );
                      }
                    }}
                    sx={{
                      position: "absolute",
                      bottom: "-20px",
                      right: "-20px",
                      backgroundColor: "background.paper",
                    }}
                  />
                )}
              </Box>
            );
          })}
        </ResponsiveBox>
        {selectedMedias && selectedMedias.length > 0 && (
          <ResponsiveStack
            direction="row"
            rowGap={3}
            columnGap={2}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            flexWrap="wrap-reverse"
          >
            <span>
              {selectedMedias.length} média
              {selectedMedias.length > 1 ? "s" : ""} sélectionné
              {selectedMedias.length > 1 ? "s" : ""}
            </span>
            <Button
              color="error"
              startIcon={<Icon path={mdiDelete} size={1} />}
              sx={{ marginLeft: "auto" }}
              onClick={() => setDeleteDialogOpen(true)}
              disabled={submitting}
            >
              Supprimer
            </Button>
          </ResponsiveStack>
        )}
      </ResponsiveStack>
      <DeleteConfirmationDialog
        label="ce média"
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        onClickDelete={() => {
          for (const id of selectedMedias) {
            onDelete({ variables: { id } });
          }
          setSelectedMedias([]);
        }}
        submitting={submitting}
      />
    </>
  );
}
