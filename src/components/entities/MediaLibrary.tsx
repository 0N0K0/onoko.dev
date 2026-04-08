import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  useTheme,
} from "@mui/material";
import { useMedia } from "../../hooks/useMedia";
import { API_URL } from "../../constants/apiConstants";
import SnackbarAlert from "../custom/snackbarAlert";
import MediaDropZone from "./MediaDropZone";
import ResponsiveTitle from "../custom/responsiveTitle";
import { ResponsiveStack } from "../custom/responsiveLayout";
import { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiCheckboxMultipleMarkedOutline,
  mdiClose,
  mdiDelete,
  mdiPlus,
} from "@mdi/js";

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
  const theme = useTheme();

  const { medias, loading, itemsError } = useMedia();

  const [addMedias, setAddMedias] = useState<boolean>(false);
  const [select, setSelect] = useState<boolean>(false);
  const [selectedMedias, setSelectedMedias] = useState<string[]>([]);

  const widths: { [key: string]: { maxWidth: number; path: string } } = {
    xl: { maxWidth: 1920, path: "" },
    l: { maxWidth: 1392, path: "" },
    m: { maxWidth: 1056, path: "" },
    s: { maxWidth: 720, path: "" },
    xs: { maxWidth: 400, path: "" },
  };

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
        <ResponsiveTitle variant="h1">Médias</ResponsiveTitle>
        <Button
          onClick={() => setAddMedias(true)}
          startIcon={<Icon path={mdiPlus} size={1} />}
          sx={{ marginLeft: "auto" }}
        >
          Importer des médias
        </Button>
      </ResponsiveStack>
      {medias?.length === 0 || !medias || addMedias ? (
        <MediaDropZone
          submitting={submitting}
          setSubmitting={setSubmitting}
          setSubmitSuccess={setSubmitSuccess}
          setSubmitError={setSubmitError}
        />
      ) : null}
      {loading ? (
        <CircularProgress />
      ) : (
        medias &&
        medias.length > 0 && (
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
          >
            <ResponsiveStack
              direction="row"
              rowGap={3}
              columnGap={2}
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              flexWrap="wrap-reverse"
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
            <ResponsiveStack
              direction="row"
              rowGap={3}
              columnGap={4}
              flexWrap="wrap"
              justifyContent="center"
              alignItems="center"
              sx={{
                overflowY: "auto",
                overflowX: "hidden",
                paddingX: "32px !important",
                marginX: "-32px !important",
                width: "calc(100% + 64px)",
              }}
            >
              {medias.map((media) => {
                for (const key in widths) {
                  if (media.type === "webp") {
                    widths[key].path = media.path.replace(
                      /\.webp$/,
                      `_${key}.webp`,
                    );
                  }
                }
                return (
                  <Box
                    key={`${media.id}-container`}
                    sx={{
                      width: "6rem",
                      position: "relative",
                      aspectRatio: "1 / 1",
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 1,
                      padding: 1,
                    }}
                  >
                    {media.type === "svg" ? (
                      <img
                        key={media.id}
                        src={API_URL + media.path}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : media.type === "webp" ? (
                      <picture key={media.id}>
                        <source
                          srcSet={API_URL + widths.xs.path}
                          media={`(max-width: ${widths.xs.maxWidth}px)`}
                        />
                        <source
                          srcSet={API_URL + widths.s.path}
                          media={`(max-width: ${widths.s.maxWidth}px)`}
                        />
                        <source
                          srcSet={API_URL + widths.m.path}
                          media={`(max-width: ${widths.m.maxWidth}px)`}
                        />
                        <source
                          srcSet={API_URL + widths.l.path}
                          media={`(max-width: ${widths.l.maxWidth}px)`}
                        />
                        <img
                          src={API_URL + widths.xl.path}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                        />
                      </picture>
                    ) : null}
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
            </ResponsiveStack>
            {selectedMedias && selectedMedias.length > 0 && (
              <Button
                color="error"
                startIcon={<Icon path={mdiDelete} size={1} />}
                sx={{ marginLeft: "auto" }}
              >
                Supprimer
              </Button>
            )}
          </ResponsiveStack>
        )
      )}
      <SnackbarAlert
        open={!!itemsError}
        message={itemsError || "Une erreur est survenue"}
        severity="error"
      />
    </>
  );
}
