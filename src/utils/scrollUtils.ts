/**
 * Inverse le scroll vertical de la souris en scroll horizontal sur un conteneur donné.
 * Utile pour les carrousels horizontaux sur desktop.
 * @param e L'événement de scroll de la souris.
 * @param containerRef La référence au conteneur à faire défiler horizontalement.
 */
export function handleReverseMouseWheel(
  e: React.WheelEvent,
  containerRef: React.RefObject<HTMLDivElement | null>,
) {
  if (containerRef?.current) {
    containerRef.current.scrollLeft += e.deltaY + e.deltaX;
  }
}
