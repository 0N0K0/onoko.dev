import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { FormControl, FormLabel, Box, useTheme } from "@mui/material";

interface WysiwygFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export default function WysiwygField({
  label,
  value,
  onChange,
}: WysiwygFieldProps) {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = "";
    const editorDiv = document.createElement("div");
    containerRef.current.appendChild(editorDiv);
    quillRef.current = new Quill(editorDiv, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: "center" }, { align: "right" }, { align: "justify" }],
          [
            { header: "3" },
            { header: "4" },
            { header: "5" },
            { header: "6" },
            "code",
          ],
          ["link"],
          ["clean"],
        ],
      },
    });
    quillRef.current.on("text-change", () => {
      if (!quillRef.current) return;
      isInternalChange.current = true;
      onChange(quillRef.current.getSemanticHTML());
    });
    return () => {
      quillRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  // Sync external value changes (e.g. when dialog opens with existing data)
  useEffect(() => {
    if (!quillRef.current) return;
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    const current = quillRef.current.getSemanticHTML();
    if (current !== value) {
      quillRef.current.setContents(
        quillRef.current.clipboard.convert({ html: value || "" }),
      );
    }
  }, [value]);

  return (
    <FormControl fullWidth>
      <FormLabel
        sx={{
          fontSize: "0.75rem",
          lineHeight: 2,
          //   marginBottom: "4px",
          color: theme.palette.text.secondary,
        }}
      >
        {label}
      </FormLabel>
      <Box
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "8px",
          boxSizing: "border-box",
          transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          "&:hover": {
            borderColor: theme.palette.text.primary,
            transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
          },
          "&:focus-within": {
            borderColor: theme.palette.primary.main,
            borderWidth: "2px",
            transition: `all ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
            "& .ql-toolbar.ql-snow": {
              padding: "11px 7px 12px",
            },
          },
          "& .ql-toolbar.ql-snow": {
            border: "none",
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.secondary,
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            lineHeight: 1.5,
            padding: "12px 8px",
            boxSizing: "border-box",
            height: "48px",
          },
          "& .ql-container.ql-snow": {
            border: "none",
            color: theme.palette.text.primary,
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            lineHeight: 1.5,
          },
          "& .ql-editor": {
            fontFamily: "Roboto, sans-serif",
            fontSize: "16px",
            lineHeight: 1.5,
            padding: "12px 16px",
            minHeight: "96px",
          },
          "& .ql-editor.ql-blank::before": {
            color: theme.palette.text.disabled,
          },
          "& .ql-toolbar .ql-picker-label, & .ql-toolbar .ql-picker-options": {
            color: theme.palette.text.secondary,
            border: `1px solid ${theme.palette.divider} !important`,
            borderRadius: "4px",
          },
          "& .ql-toolbar .ql-picker-options": {
            backgroundColor: theme.palette.background.paper,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.051), rgba(255, 255, 255, 0.051))",
          },
          "& .ql-toolbar .ql-picker-label:hover, & .ql-toolbar .ql-picker-label.ql-active, & .ql-toolbar .ql-picker-item:hover, & .ql-toolbar .ql-picker-item.ql-selected":
            {
              color: theme.palette.primary.main,
            },
          "& .ql-toolbar .ql-stroke": {
            stroke: theme.palette.text.secondary,
          },
          "& .ql-toolbar .ql-fill": {
            fill: theme.palette.text.secondary,
          },
          "& .ql-toolbar button:hover .ql-stroke, & .ql-toolbar button:focus .ql-stroke, & .ql-toolbar button.ql-active .ql-stroke, & .ql-toolbar .ql-picker-label:hover .ql-stroke, & .ql-toolbar .ql-picker-label.ql-active .ql-stroke, & .ql-toolbar .ql-picker-item:hover .ql-stroke, & .ql-toolbar .ql-picker-item.ql-selected .ql-stroke":
            {
              stroke: theme.palette.primary.main,
            },
          "& .ql-toolbar button:hover .ql-fill, & .ql-toolbar button:focus .ql-fill, & .ql-toolbar button.ql-active .ql-fill, & .ql-toolbar .ql-picker-label:hover .ql-fill, & .ql-toolbar .ql-picker-label.ql-active .ql-fill, & .ql-toolbar .ql-picker-item:hover .ql-fill, & .ql-toolbar .ql-picker-item.ql-selected .ql-fill":
            {
              fill: theme.palette.primary.main,
            },
        }}
      >
        <div ref={containerRef} />
      </Box>
    </FormControl>
  );
}
