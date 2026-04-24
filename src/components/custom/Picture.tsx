import { API_URL } from "../../constants/apiConstants";
import { IMAGE_WIDTHS } from "../../constants/imageConstants";
import type { Media } from "../../types/entities/mediaTypes";

export default function Picture({
  image,
  maxWidth = "100%",
  maxHeight = "100%",
  objectFit = "contain",
  objectPosition,
  style,
}: {
  image: Media;
  maxWidth?: string;
  maxHeight?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  style?: React.CSSProperties;
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
        objectPosition: objectPosition || image.focus || "50% 50%",
        boxSizing: "border-box",
        ...style,
      }}
    />
  ) : image.type === "webp" ? (
    <picture
      key={image.id}
      style={{
        display: "block",
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        overflow: "hidden",
        boxSizing: "border-box",
        ...style,
      }}
    >
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
          objectPosition: objectPosition || image.focus || "50% 50%",
        }}
      />
    </picture>
  ) : null;
}
