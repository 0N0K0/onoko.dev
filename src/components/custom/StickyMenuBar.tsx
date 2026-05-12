import { AppBar, Link, Toolbar, useTheme } from "@mui/material";
import CustomIconButton from "./CustomIconButton";
import { useAuthContext } from "../../context/AuthContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

export interface MenuSection {
  id: string;
  label: string;
}

interface StickyMenuBarProps {
  sections: MenuSection[];
}

export default function StickyMenuBar({ sections }: StickyMenuBarProps) {
  const { isAuthenticated } = useAuthContext();
  const theme = useTheme();

  const menuBarRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const canAutoScrollRef = useRef(true);
  const [showMenuBarArrows, setShowMenuBarArrows] = useState(false);
  const [disableLeftMenuButton, setDisableLeftMenuButton] = useState(false);
  const [disableRightMenuButton, setDisableRightMenuButton] = useState(false);

  const checkOverflow = useCallback(() => {
    if (menuBarRef.current) {
      setShowMenuBarArrows(
        menuBarRef.current.scrollWidth > menuBarRef.current.clientWidth,
      );
      setDisableLeftMenuButton(menuBarRef.current.scrollLeft === 0);
      setDisableRightMenuButton(
        menuBarRef.current.scrollLeft + menuBarRef.current.clientWidth >=
          menuBarRef.current.scrollWidth,
      );
    }
  }, []);

  const setMenuBarRef = (node: HTMLDivElement | null) => {
    if (menuBarRef.current) {
      menuBarRef.current.removeEventListener("scroll", checkOverflow);
    }
    if (node) {
      node.addEventListener("scroll", checkOverflow);
      setTimeout(checkOverflow, 0);
    }
    menuBarRef.current = node;
  };

  // Scrollspy + auto-scroll de la toolbar
  useEffect(() => {
    const handleToolbarScroll = () => {
      canAutoScrollRef.current = false;
    };
    const toolbar = document.getElementById("toolbar-scrollable");
    toolbar?.addEventListener("scroll", handleToolbarScroll, { passive: true });

    const handleScrollSpy = () => {
      canAutoScrollRef.current = true;
      let lastSectionId = "";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            rect.top < window.innerHeight &&
            window.innerHeight - Math.max(rect.top, 0) >= 168
          ) {
            lastSectionId = id;
          }
        }
      }
      setActiveSection(lastSectionId);

      if (!canAutoScrollRef.current) return;
      const activeLink = document.querySelector(
        `#toolbar-scrollable a[href="#${lastSectionId}"]`,
      );
      const toolbar = document.getElementById("toolbar-scrollable");
      if (activeLink && toolbar) {
        const linkRect = activeLink.getBoundingClientRect();
        const toolbarRect = toolbar.getBoundingClientRect();
        if (
          linkRect.left < toolbarRect.left ||
          linkRect.right > toolbarRect.right
        ) {
          activeLink.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
          });
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => {
      window.removeEventListener("scroll", handleScrollSpy);
      toolbar?.removeEventListener("scroll", handleToolbarScroll);
    };
  }, [sections]);

  useEffect(() => {
    window.addEventListener("resize", checkOverflow);
    checkOverflow();
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <AppBar
      component="nav"
      elevation={0}
      sx={{
        position: "sticky",
        top: isAuthenticated ? "96px" : "48px",
        zIndex: 2,
        borderBottom: `1px solid rgb(81, 81, 81)`,
        width: "100%",
        overflow: "hidden",
        flexDirection: "row",
        justifyContent: "center",
        height: "60px",
        paddingTop: "12px",
      }}
    >
      {showMenuBarArrows && (
        <CustomIconButton
          id="toolbar-arrow-left"
          icon={mdiChevronLeft}
          onClick={() =>
            menuBarRef.current?.scrollBy({ left: -200, behavior: "smooth" })
          }
          disabled={disableLeftMenuButton}
        />
      )}
      <Toolbar
        id="toolbar-scrollable"
        ref={setMenuBarRef}
        sx={{
          overflowX: "auto",
          columnGap: 2,
          minHeight: "48px",
          paddingX: "16px !important",
          background: "none",
          boxShadow: "none",
          scrollbarWidth: "none",
          flex: "1 1 auto",
          maxWidth: "fit-content",
          "&::-webkit-scrollbar": { display: "none" },
          "& a": {
            color: theme.palette.text.primary,
            textDecoration: "none",
            display: "inline-block",
            position: "relative",
            transition: `color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
            whiteSpace: "nowrap",
            "&::after": {
              content: '""',
              display: "block",
              position: "absolute",
              bottom: "6px",
              left: 0,
              transform: "scaleX(0)",
              transformOrigin: "right",
              width: "100%",
              height: "1px",
              backgroundColor: theme.palette.primary.main,
              transition: `transform ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
            },
            "&:hover": {
              color: theme.palette.primary.main,
              "&::after": {
                transform: "scaleX(1)",
                transformOrigin: "left",
              },
            },
            "&.active-section": {
              color: theme.palette.primary.light,
            },
          },
        }}
      >
        {sections.map(({ id, label }) => (
          <Link
            key={id}
            href={`#${id}`}
            className={activeSection === id ? "active-section" : undefined}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(id);
              if (el) {
                const y =
                  el.getBoundingClientRect().top +
                  window.scrollY -
                  (isAuthenticated ? 180 : 132);
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
          >
            {label}
          </Link>
        ))}
      </Toolbar>
      {showMenuBarArrows && (
        <CustomIconButton
          id="toolbar-arrow-right"
          icon={mdiChevronRight}
          onClick={() =>
            menuBarRef.current?.scrollBy({ left: 200, behavior: "smooth" })
          }
          disabled={disableRightMenuButton}
        />
      )}
    </AppBar>
  );
}
