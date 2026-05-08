import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  const env = import.meta.env.VITE_ENVIRONMENT || "production";
  useEffect(() => {
    document.title =
      env == "production"
        ? title
          ? `${title} | Onoko`
          : "Onoko"
        : `[${env}] ${title ? `${title} | Onoko` : "Onoko"}`;
  }, [title]);
}
