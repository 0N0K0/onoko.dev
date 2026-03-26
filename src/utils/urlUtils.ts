/**
 * Concatène proprement une base d'URL et un chemin, sans double slash.
 * @param baseUrl ex: http://localhost:4000/
 * @param path ex: /4ntjnra6
 * @returns string ex: http://localhost:4000/4ntjnra6
 */
export function joinUrl(baseUrl: string, path: string): string {
  try {
    return new URL(path, baseUrl).href;
  } catch (err) {
    console.error("URL invalide:", err);
    return baseUrl + path;
  }
}
