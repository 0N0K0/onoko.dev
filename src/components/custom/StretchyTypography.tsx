import { Typography, type TypographyProps } from "@mui/material";
import { useLayoutEffect, useRef, useState } from "react";

export default function StretchyTypography({
  fontSize,
  baselineHeight,
  containerRef,
  ...props
}: TypographyProps & {
  fontSize: number;
  baselineHeight?: number;
  containerRef: React.RefObject<any>;
}) {
  const titleRef = useRef<HTMLDivElement>(null);

  const [autoFontSize, setAutoFontSize] = useState<number | undefined>(
    undefined,
  );
  const [autoLineHeight, setAutoLineHeight] = useState<number | undefined>(
    undefined,
  );

  const fitFontSize = () => {
    if (!props.children || !titleRef.current || !containerRef.current) return;
    const containerpaddingLeft = parseFloat(
      getComputedStyle(containerRef.current).paddingLeft,
    );
    const containerpaddingRight = parseFloat(
      getComputedStyle(containerRef.current).paddingRight,
    );
    const containerWidth =
      containerRef.current.offsetWidth -
      containerpaddingLeft -
      containerpaddingRight;
    let finalFontSize = fontSize;
    titleRef.current.style.fontSize = fontSize + "px";
    let titleWidth = titleRef.current.scrollWidth;
    while (titleWidth > containerWidth && finalFontSize > 16) {
      finalFontSize -= 2;
      titleRef.current.style.fontSize = finalFontSize + "px";
      titleWidth = titleRef.current.scrollWidth;
    }

    setAutoFontSize(finalFontSize);
    baselineHeight &&
      setAutoLineHeight(Math.round(finalFontSize / 16) * baselineHeight); // Adjust line height based on font size
  };

  useLayoutEffect(() => {
    fitFontSize();
    document.fonts.ready.then(fitFontSize);
    window.addEventListener("resize", fitFontSize);
    return () => {
      window.removeEventListener("resize", fitFontSize);
    };
    // eslint-disable-next-line
  });

  return (
    <Typography
      ref={titleRef}
      {...props}
      sx={{
        ...props.sx,
        fontSize: autoFontSize,
        lineHeight: autoLineHeight ? `${autoLineHeight}px` : 1,
      }}
    >
      {props.children}
    </Typography>
  );
}
