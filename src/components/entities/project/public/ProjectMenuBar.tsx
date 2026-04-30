import { AppBar, Link, Toolbar, useTheme } from "@mui/material";
import CustomIconButton from "../../../custom/CustomIconButton";
import type { Project } from "../../../../types/entities/projectTypes";
import { useAuthContext } from "../../../../context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

export default function ProjectMenuBar({ project }: { project: Project }) {
  const { isAuthenticated } = useAuthContext();
  const theme = useTheme();

  const sections: { id: string; label: string }[] = [];

  if (project?.intro || project?.website?.url || project?.mockup?.url)
    sections.push({ id: "intro", label: "Introduction" });
  if (project?.mockup?.images && project.mockup.images.length > 0)
    sections.push({ id: "mockup", label: "Maquettes" });
  if (project?.roles && project.roles.length > 0)
    sections.push({ id: "roles", label: "Prestations" });
  if (project?.stacks && project.stacks.length > 0)
    sections.push({ id: "technologies", label: "Technologies" });
  if (
    project?.kpis?.issues ||
    project?.kpis?.points ||
    project?.kpis?.commits ||
    project?.kpis?.pullRequests
  )
    sections.push({ id: "kpis", label: "KPI" });
  if (project?.presentation) {
    if (project.presentation.context)
      sections.push({ id: "context", label: "Contexte" });

    if (project.presentation.client)
      sections.push({ id: "client", label: "Client" });

    if (project.presentation.issue)
      sections.push({ id: "issue", label: "Finalités" });

    if (project.presentation.audience)
      sections.push({ id: "audience", label: "Audience" });
  }
  if (project?.need) {
    if (project.need.features)
      sections.push({ id: "features", label: "Fonctionnalités" });

    if (project.need.functionalConstraints)
      sections.push({
        id: "functional-constraints",
        label: "Contraintes fonctionnelles",
      });

    if (project.need.technicalConstraints)
      sections.push({
        id: "technical-constraints",
        label: "Contraintes techniques",
      });
  }
  if (project?.coworkers && project.coworkers.length > 0)
    sections.push({ id: "team", label: "Équipe" });
  if (project?.organization) {
    if (project.organization.methodology)
      sections.push({ id: "methodology", label: "Gestion de projet" });

    if (project.organization.anticipation)
      sections.push({ id: "anticipation", label: "Anticipation" });

    if (project.organization.evolution)
      sections.push({ id: "evolution", label: "Évolutions" });

    if (project.organization.validation)
      sections.push({ id: "validation", label: "Validation" });
  }
  if (project?.feedback) {
    if (project.feedback.client)
      sections.push({ id: "client-feedback", label: "Retours" });
    if (project.feedback.general)
      sections.push({ id: "general-feedback", label: "Bilan" });
  }

  if (sections.length < 3) return null;

  const menuBarRef = useRef<HTMLDivElement | null>(null);
  const setMenuBarRef = (node: HTMLDivElement | null) => {
    if (menuBarRef.current) {
      menuBarRef.current.removeEventListener("scroll", checkOverflow);
    }
    if (node) {
      node.addEventListener("scroll", checkOverflow);
      // On vérifie l'overflow dès que le ref est attaché
      setTimeout(checkOverflow, 0);
    }
    menuBarRef.current = node;
  };

  const [activeSection, setActiveSection] = useState<string>("");

  const [canAutoScroll, setCanAutoScroll] = useState(true);

  // Désactive l'auto-scroll si l'utilisateur scrolle la toolbar
  useEffect(() => {
    const toolbar = document.getElementById("toolbar-scrollable");
    if (!toolbar) return;
    const handleToolbarScroll = () => setCanAutoScroll(false);
    toolbar.addEventListener("scroll", handleToolbarScroll, { passive: true });
    return () => {
      toolbar.removeEventListener("scroll", handleToolbarScroll);
    };
  }, []);

  // Réactive l'auto-scroll si l'utilisateur scrolle la page (window)
  useEffect(() => {
    const handleWindowScroll = () => {
      // On ne réactive que si ce n'est pas un scroll programmatique de la toolbar
      setCanAutoScroll(true);
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  useEffect(() => {
    // Ce handler ne fait que le scrollspy et l'auto-scroll si canAutoScroll est actif
    const handleScrollSpy = () => {
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
      // Ne scroller la toolbar que si le lien actif N'EST PAS visible ET que la toolbar n'est pas à une extrémité
      if (!canAutoScroll) return;
      const activeLink = document.querySelector(
        `#toolbar-scrollable a[href="#${lastSectionId}"]`,
      );
      const toolbar = document.getElementById("toolbar-scrollable");
      if (activeLink && toolbar) {
        const linkRect = activeLink.getBoundingClientRect();
        const toolbarRect = toolbar.getBoundingClientRect();
        // On ne scroll que si le lien actif n'est pas visible ET qu'on n'est pas à une extrémité
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

    window.addEventListener("scroll", handleScrollSpy, {
      passive: true,
    });
    handleScrollSpy();
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, [sections, canAutoScroll]);

  // Callback ref pour garantir l'attachement de l'écouteur scroll
  const [showMenuBarArrows, setShowMenuBarArrows] = useState(false);
  const [disableLeftMenuButton, setDisableLeftMenuButton] = useState(false);
  const [disableRightMenuButton, setDisableRightMenuButton] = useState(false);

  // checkOverflow doit être défini hors du useEffect pour être utilisé dans le callback ref
  const checkOverflow = () => {
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
  };

  // Callback ref pour attacher/détacher l'écouteur scroll

  useEffect(() => {
    window.addEventListener("resize", checkOverflow);
    checkOverflow();
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
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
      }}
    >
      {/* Flèche gauche */}
      {showMenuBarArrows && (
        <CustomIconButton
          id="toolbar-arrow-left"
          icon={mdiChevronLeft}
          onClick={() => {
            menuBarRef.current?.scrollBy({
              left: -200,
              behavior: "smooth",
            });
          }}
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
          "&::-webkit-scrollbar": {
            display: "none",
          },
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
                const y = el.getBoundingClientRect().top + window.scrollY - 96;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
          >
            {label}
          </Link>
        ))}
      </Toolbar>
      {/* Flèche droite */}
      {showMenuBarArrows && (
        <CustomIconButton
          id="toolbar-arrow-right"
          icon={mdiChevronRight}
          onClick={() => {
            menuBarRef.current?.scrollBy({ left: 200, behavior: "smooth" });
          }}
          disabled={disableRightMenuButton}
        />
      )}
    </AppBar>
  );
}
