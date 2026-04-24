import Dropzone from "react-dropzone";
import { ResponsiveStack } from "../../custom/ResponsiveLayout";
import { useTheme } from "@mui/material";
import ResponsiveBodyTypography from "../../custom/ResponsiveBodyTypography";
import { useState } from "react";

export default function MediaDropZone({
  handleAdd,
  submitting,
}: {
  handleAdd: (options: {
    variables: { input: { file: File; category?: string } };
  }) => unknown;
  submitting: boolean;
}) {
  const theme = useTheme();

  const [dragOver, setDragOver] = useState(false);

  const handleDropImages = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      for (const file of acceptedFiles) {
        handleAdd({ variables: { input: { file } } });
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
          {...getRootProps()}
          sx={{
            paddingX: 4,
            justifyContent: "center",
            alignItems: "center",
            opacity: submitting ? 0.5 : 1,
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
            boxSizing: "border-box",
            transition: "all 300ms ease-in-out",
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
