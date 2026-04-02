import { useEffect, useState } from "react";

/**
 * Hook personnalisé pour obtenir la largeur de la fenêtre et réagir aux changements de taille
 * @returns {number} La largeur actuelle de la fenêtre en pixels
 */
export function useWindowWidth(): number {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
