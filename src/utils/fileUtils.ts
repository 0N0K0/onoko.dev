/**
 * Convertit un fichier en un objet contenant un buffer, le type MIME et le nom original du fichier.
 * @param {File} file - Le fichier à convertir.
 * @returns {Promise<{buffer: number[], mimetype: string, originalname: string}>} Un objet avec les propriétés buffer, mimetype et originalname.
 */
export async function fileToBufferObj(file: File): Promise<{
  buffer: number[];
  mimetype: string;
  originalname: string;
}> {
  const arrayBuffer = await file.arrayBuffer();
  return {
    buffer: Array.from(new Uint8Array(arrayBuffer)), // ou Buffer.from(arrayBuffer) côté Node
    mimetype: file.type,
    originalname: file.name,
  };
}
