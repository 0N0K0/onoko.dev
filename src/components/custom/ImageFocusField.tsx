import { useRef, useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  FormLabel,
} from "@mui/material";
import Icon from "@mdi/react";
import { mdiRefresh } from "@mdi/js";
import Picture from "./Picture";
import type { Media } from "../../types/entities/mediaTypes";
import { ResponsiveStack } from "./ResponsiveLayout";

const ASPECT_RATIOS = [
  { label: "21:9", value: 21 / 9 },
  { label: "16:9", value: 16 / 9 },
  { label: "4:3", value: 4 / 3 },
  { label: "1:1", value: 1 },
  { label: "3:4", value: 3 / 4 },
  { label: "9:16", value: 9 / 16 },
  { label: "9:20", value: 9 / 20 },
];

function parseFocus(focus?: string): { x: number; y: number } {
  if (!focus) return { x: 50, y: 50 };
  const parts = focus.split(" ");
  const px = parseFloat(parts[0]);
  const py = parseFloat(parts[1]);
  return {
    x: Math.round(Number.isNaN(px) ? 50 : px),
    y: Math.round(Number.isNaN(py) ? 50 : py),
  };
}

export function ImageFocusField({
  image,
  value,
  onChange,
}: {
  image?: Media;
  value?: string;
  onChange: (focus: string) => void;
}) {
  const theme = useTheme();

  const { x, y } = parseFocus(value);
  const [ratio, setRatio] = useState("1:1");
  const [isDown, setIsDown] = useState(false);
  const isDragging = useRef(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const selectedRatio =
    ASPECT_RATIOS.find((r) => r.label === ratio)?.value ?? 1 / 1;

  const getFocusFromEvent = (clientX: number, clientY: number) => {
    const rect = imageContainerRef.current!.getBoundingClientRect();
    const newX = Math.min(
      100,
      Math.max(0, Math.round(((clientX - rect.left) / rect.width) * 100)),
    );
    const newY = Math.min(
      100,
      Math.max(0, Math.round(((clientY - rect.top) / rect.height) * 100)),
    );
    return { newX, newY };
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    setIsDown(true);
    document.body.style.cursor = "none";
    const { newX, newY } = getFocusFromEvent(e.clientX, e.clientY);
    onChange(`${newX}% ${newY}%`);

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current) return;
      const { newX, newY } = getFocusFromEvent(ev.clientX, ev.clientY);
      onChange(`${newX}% ${newY}%`);
    };
    const onMouseUp = () => {
      isDragging.current = false;
      setIsDown(false);
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  const handleCoordChange = (axis: "x" | "y", raw: string) => {
    const parsed = parseFloat(raw);
    const val = Math.min(
      100,
      Math.max(0, Math.round(Number.isNaN(parsed) ? 0 : parsed)),
    );
    onChange(axis === "x" ? `${val}% ${y}%` : `${x}% ${val}%`);
  };

  if (!image) return null;

  return (
    <ResponsiveStack rowGap={1.5}>
      <FormLabel sx={{ fontSize: "1rem", lineHeight: 1.5 }}>Focus</FormLabel>

      {/* Image source — clic ou drag pour définir le point de focus */}
      <Box
        ref={imageContainerRef}
        onMouseDown={handleMouseDown}
        sx={{
          position: "relative",
          cursor: isDown ? "none" : "crosshair",
          lineHeight: 0,
          userSelect: "none",
        }}
      >
        <Picture
          image={image}
          maxWidth="100%"
          maxHeight="100%"
          objectFit="contain"
        />
        {/* Marqueur croix */}
        <Box
          sx={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            width: 24,
            height: 24,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: "1px",
              bgcolor: theme.palette.common.black,
              boxShadow: `0 0 0 1px ${theme.palette.common.white}`,
              transform: "translateY(-50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "1px",
              bgcolor: theme.palette.common.black,
              boxShadow: `0 0 0 1px ${theme.palette.common.white}`,
              transform: "translateX(-50%)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 6,
              height: 6,
              borderRadius: "50%",
              bgcolor: theme.palette.primary.main,
              boxShadow: `0 0 0 1px ${theme.palette.common.black}, 0 0 0 2px ${theme.palette.common.white}`,
            }}
          />
        </Box>
      </Box>

      {/* Contrôles */}
      <ResponsiveStack
        sx={{
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
        }}
      >
        <TextField
          label="X (%)"
          type="number"
          size="small"
          value={x}
          slotProps={{ htmlInput: { min: 0, max: 100 } }}
          onChange={(e) => handleCoordChange("x", e.target.value)}
          sx={{ flex: "1 1 auto" }}
        />
        <TextField
          label="Y (%)"
          type="number"
          size="small"
          value={y}
          slotProps={{ htmlInput: { min: 0, max: 100 } }}
          onChange={(e) => handleCoordChange("y", e.target.value)}
          sx={{ flex: "1 1 auto" }}
        />
        <Tooltip title="Réinitialiser (50% 50%)">
          <IconButton onClick={() => onChange("50% 50%")}>
            <Icon path={mdiRefresh} size={1} />
          </IconButton>
        </Tooltip>
      </ResponsiveStack>

      {/* Aperçu */}
      <ResponsiveStack
        rowGap={0.75}
        sx={{
          width: "100%",
        }}
      >
        <FormLabel sx={{ fontSize: "0.75rem", lineHeight: 2 }}>
          Aperçu
        </FormLabel>
        <ToggleButtonGroup
          value={ratio}
          exclusive
          onChange={(_, v) => v && setRatio(v)}
          size="small"
          sx={{ marginX: "auto" }}
        >
          {ASPECT_RATIOS.map((r) => (
            <ToggleButton
              key={r.label}
              value={r.label}
              sx={{ fontSize: "0.75rem", padding: "6px 8px", lineHeight: 1 }}
            >
              {r.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        <Picture
          image={image}
          maxWidth="100%"
          maxHeight="100%"
          objectFit="cover"
          objectPosition={value || "50% 50%"}
          style={{
            width: "100%",
            aspectRatio: selectedRatio,
            borderRadius: 8,
            border: `1px solid ${theme.palette.divider}`,
          }}
        />
      </ResponsiveStack>
    </ResponsiveStack>
  );
}
