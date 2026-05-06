/**
 * Fonction utilitaire pour afficher du texte sans balises HTML.
 * @param html La chaîne de caractères contenant du HTML.
 * @returns La chaîne de caractères sans les balises HTML.
 */
export function stripHtml(html: string): string {
  return (
    new DOMParser().parseFromString(html, "text/html").body.textContent ?? html
  );
}

/**
 * Fonction utilitaire pour vérifier si une chaîne de caractères HTML contient du contenu riche (texte formaté, images, vidéos, etc.).
 * @param html La chaîne de caractères contenant du HTML.
 * @returns true si le contenu est considéré comme riche, false sinon.
 */
export function hasRichTextContent(html?: string | null): boolean {
  if (!html) return false;

  const doc = new DOMParser().parseFromString(html, "text/html");

  doc.querySelectorAll(".ql-cursor").forEach((node) => node.remove());

  const normalizedText = (doc.body.textContent ?? "")
    .replace(/\u00A0/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim();

  if (normalizedText.length > 0) return true;

  return Boolean(
    doc.body.querySelector(
      "img,video,iframe,embed,object,svg,table,ul,ol,blockquote,pre,hr",
    ),
  );
}
