/**
 * Concatène proprement une base d'URL et un chemin, sans double slash.
 * @param {string} baseUrl ex: http://localhost:4000/
 * @param {string} path ex: /4ntjnra6
 * @returns {string} ex: http://localhost:4000/4ntjnra6
 */
export function joinUrl(baseUrl: string, path: string): string {
  try {
    return new URL(path, baseUrl).href;
  } catch {
    return baseUrl + path;
  }
}

/**
 * Convertit une chaîne de caractères en slug (format URL-friendly)
 * @param {string} text La chaîne à convertir
 * @return {string} Le slug généré
 */
export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD") // décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // supprime les diacritiques
    .toLowerCase()
    .trim()
    .replace(/[\.\/\\]/g, "-") // remplace points, slashs, backslashs par -
    .replace(/\s+/g, "-") // remplace les espaces par -
    .replace(/[^a-z0-9\-_]/g, "") // supprime tout sauf a-z, 0-9, - et _
    .replace(/\-\-+/g, "-") // remplace les -- par un seul -
    .replace(/^\-+|\-+$/g, ""); // supprime les - en début/fin
}
