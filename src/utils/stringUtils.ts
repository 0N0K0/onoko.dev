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
