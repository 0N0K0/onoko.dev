import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
interface UseWysiwygOptions {
  value: string;
  onChange: (value: string) => void;
}

export default function useWysiwyg({ value, onChange }: UseWysiwygOptions) {
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
      onChange(quillRef.current.root.innerHTML);
    });
    return () => {
      quillRef.current = null;
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  useEffect(() => {
    if (!quillRef.current) return;
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    const current = quillRef.current.root.innerHTML;
    if (current !== value) {
      quillRef.current.setContents(
        quillRef.current.clipboard.convert({ html: value || "" }),
      );
    }
  }, [value]);

  return { containerRef };
}
