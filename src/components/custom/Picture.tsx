import { API_URL } from "../../constants/apiConstants";
import { IMAGE_WIDTHS } from "../../constants/imageConstants";
import type { Media } from "../../types/entities/mediaTypes";

export default function Picture({
  image,
  maxWidth = "100%",
  maxHeight = "100%",
  objectFit = "contain",
}: {
  image: Media;
  maxWidth?: string;
  maxHeight?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
}) {
  const paths: { [key: string]: string } = {
    xl: "",
    l: "",
    m: "",
    s: "",
    xs: "",
  };

  if (image.type === "webp") {
    for (const key in paths) {
      paths[key] = image.path.replace(/\.webp$/, `_${key}.webp`);
    }
  }

  return image.type === "svg" ? (
    <img
      key={image.id}
      src={API_URL + image.path}
      style={{
        width: "100%",
        height: "100%",
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        objectFit: objectFit,
      }}
    />
  ) : image.type === "webp" ? (
    <picture key={image.id}>
      <source
        srcSet={API_URL + paths.xs}
        media={`(max-width: ${IMAGE_WIDTHS.xs}px)`}
      />
      <source
        srcSet={API_URL + paths.s}
        media={`(max-width: ${IMAGE_WIDTHS.s}px)`}
      />
      <source
        srcSet={API_URL + paths.m}
        media={`(max-width: ${IMAGE_WIDTHS.m}px)`}
      />
      <source
        srcSet={API_URL + paths.l}
        media={`(max-width: ${IMAGE_WIDTHS.l}px)`}
      />
      <img
        src={API_URL + paths.xl}
        style={{
          width: "100%",
          height: "100%",
          maxWidth: maxWidth,
          maxHeight: maxHeight,
          objectFit: objectFit,
        }}
      />
    </picture>
  ) : null;
}
