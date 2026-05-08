import React, { forwardRef } from "react";
import Icon from "@mdi/react";

const CustomCursor = forwardRef<
  HTMLDivElement,
  {
    icon: string;
    style?: React.CSSProperties;
  } & React.HTMLAttributes<HTMLDivElement>
>(({ icon, style, ...props }, ref) => (
  <>
    <style>
      {
        "@keyframes ripple { from { transform: scale(1) translate(-50%, -50%); } to { transform: scale(1.1) translate(-50%, -50%); } }"
      }
    </style>
    <div
      {...props}
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 9999,
        transform: "translate(-50%, -50%)",
        opacity: 0,
        transition: "opacity 180ms ease-in-out",
        animation: "ripple 1.5s ease infinite alternate",
        ...style,
      }}
    >
      <Icon
        path={icon}
        size={1}
        style={{ filter: "drop-shadow(2px 2px 2px rgba(0,0,0))" }}
      />
    </div>
  </>
));

export default CustomCursor;
