import Dropzone from "react-dropzone";
import { ResponsiveStack } from "../custom/responsiveLayout";
import { useTheme } from "@mui/material";
import ResponsiveBodyTypography from "../custom/responsiveBodyTypography";
import useMediaMutations from "../../hooks/mutations/useMediaMutations";
import { useMedia } from "../../hooks/useMedia";
import { useState } from "react";

export default function MediaDropZone({
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

  const { setMedias } = useMedia();

  const [dragOver, setDragOver] = useState(false);

  const { handleAdd } = useMediaMutations({
    setSubmitSuccess,
    setSubmitError,
    setSubmitting,
    setMedias,
  });

  const handleDropImages = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      for (const file of acceptedFiles) {
        handleAdd({ file });
      }
    }
  };

  return (
    <Dropzone
      onDragOver={(e) => {
        setDragOver(true);
        e.preventDefault();
      }}
      onDragLeave={() => {
        setDragOver(false);
      }}
      onDrop={(acceptedFiles) => {
        handleDropImages(acceptedFiles);
        setDragOver(false);
      }}
      accept={{
        "image/*": [".webp", ".png", ".jpg", ".jpeg", ".svg"],
      }}
      disabled={submitting}
    >
      {({ getRootProps, getInputProps }) => (
        <ResponsiveStack
          paddingY={3}
          paddingX={4}
          justifyContent="center"
          alignItems="center"
          {...getRootProps()}
          sx={{
            width: "100%",
            height: "168px",
            border:
              "2px " +
              (dragOver
                ? `solid ${theme.palette.primary.main}`
                : `dashed ${theme.palette.divider}`),
            borderRadius: "8px",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: dragOver
              ? theme.palette.action.hover
              : "transparent",
            "&:hover": {
              border: "2px dashed " + theme.palette.text.secondary,
            },
          }}
        >
          <input {...getInputProps()} />
          <ResponsiveBodyTypography
            variant="bodyMd"
            color="textSecondary"
            style={{ whiteSpace: "pre-line" }}
          >
            {dragOver
              ? "Déposer les\u00A0médias dans\u00A0la\u00A0zone"
              : `Glisser les\u00A0médias dans\u00A0la\u00A0zone,\nou\u00A0cliquer pour\u00A0sélectionner des\u00A0fichiers`}
          </ResponsiveBodyTypography>
        </ResponsiveStack>
      )}
    </Dropzone>
  );
}
