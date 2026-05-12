import { ResponsiveStack } from "../custom/ResponsiveLayout";
import SectionTitle from "./SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useBreakpoints } from "../../hooks/mediaQueries";
import Timeline from "@mui/lab/Timeline";
import CustomTimelineItem from "../custom/CustomTimelineItem";
import TimelineLink from "./TimelineLink";
import { mdiCheck, mdiChevronLeft, mdiChevronRight, mdiReplay } from "@mdi/js";
import CustomIconButton from "../custom/CustomIconButton";

export default function MethodWorkflowsSection() {
  const theme = useTheme();
  const { isLg, isSm } = useBreakpoints();

  const [swiperLocked, setSwiperLocked] = useState(false);

  return (
    <ResponsiveStack id="workflow" rowGap={7.5}>
      <SectionTitle
        title="Cycle de production."
        subtitle="Définir une trajectoire adaptée"
      />
      <Swiper
        modules={[FreeMode, Navigation, Pagination]}
        slidesPerView={1}
        breakpoints={{
          [theme.breakpoints.values.lg]: { slidesPerView: 2 },
          [theme.breakpoints.values.xl]: { slidesPerView: 3 },
        }}
        spaceBetween={32}
        freeMode={true}
        navigation={{
          nextEl: ".custom-swiper-button-next",
          prevEl: ".custom-swiper-button-prev",
        }}
        pagination={{
          clickable: true,
          renderBullet: function (_, className) {
            return `<span class="${className}" style="width: 16px; height: 2px; border-radius: 2px;"></span>`;
          },
        }}
        loop={!swiperLocked}
        watchOverflow
        onSwiper={(swiper) => setSwiperLocked(swiper.isLocked)}
        onUpdate={(swiper) => setSwiperLocked(swiper.isLocked)}
        onResize={(swiper) => setSwiperLocked(swiper.isLocked)}
        style={
          {
            width: `calc(100% + ${isLg ? 128 : 64}px)`,
            minWidth: 0,
            paddingBottom: "72px",
            marginBottom: "-72px",
            marginLeft: isLg ? -64 : -32,
            marginRight: isLg ? -64 : -32,
            paddingLeft: isLg ? 64 : isSm ? 32 : 0,
            paddingRight: isLg ? 64 : isSm ? 32 : 0,
            "--swiper-navigation-color": theme.palette.text.secondary,
            "--swiper-pagination-color": theme.palette.text.secondary,
            "--swiper-pagination-bullet-inactive-color": theme.palette.divider,
            "--swiper-pagination-bullet-inactive-opacity": "1",
          } as React.CSSProperties
        }
      >
        <SwiperSlide>
          <ResponsiveStack rowGap={7.5}>
            <ResponsiveStack rowGap={1.5}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  fontWeight: "100",
                }}
              >
                Site statique
              </Typography>
              <Typography
                variant="bodyMd"
                sx={{
                  fontStyle: "italic",
                  textAlign: "center",
                  color: theme.palette.text.secondary,
                  fontWeight: "300",
                }}
              >
                Production focalisée sur l’expérience&nbsp;utilisateur
              </Typography>
            </ResponsiveStack>
            <Timeline
              position="alternate"
              sx={{
                margin: "0 !important",
                padding: "0 !important",
              }}
            >
              <CustomTimelineItem
                content={
                  <TimelineLink href="#project-management">
                    Cadrage fonctionnel
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#design">
                    Wireframes{" "}
                    <span style={{ color: theme.palette.primary.light }}>
                      &
                    </span>
                    &nbsp;Maquettes
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#dev">
                    Développement frontend
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#dev">
                    Tests{" "}
                    <span style={{ color: theme.palette.primary.light }}>
                      &
                    </span>
                    &nbsp;Validation
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#infra">
                    Livraison en&nbsp;production
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <Typography>
                    <span style={{ color: theme.palette.primary.light }}>
                      Résultat :
                    </span>{" "}
                    Site&nbsp;autonome
                  </Typography>
                }
                dotIcon={mdiCheck}
                connectorProps={{
                  sx: {
                    background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                  },
                }}
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#contract">
                    Maintenance légère
                  </TimelineLink>
                }
                connectorProps={{
                  sx: {
                    background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                  },
                }}
              />
            </Timeline>
          </ResponsiveStack>
        </SwiperSlide>
        <SwiperSlide>
          <ResponsiveStack rowGap={7.5}>
            <ResponsiveStack rowGap={1.5}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  fontWeight: "100",
                }}
              >
                Produit dynamique
              </Typography>
              <Typography
                variant="bodyMd"
                sx={{
                  fontStyle: "italic",
                  textAlign: "center",
                  color: theme.palette.text.secondary,
                  fontWeight: "300",
                }}
              >
                Architecture évolutive orientée&nbsp;produit
              </Typography>
            </ResponsiveStack>
            <Timeline
              position="alternate"
              sx={{
                margin: "0 !important",
                padding: "0 !important",
              }}
            >
              <CustomTimelineItem
                content={
                  <TimelineLink href="#project-management">
                    Analyse des besoins{" "}
                    <span style={{ color: theme.palette.primary.light }}>
                      &
                    </span>
                    &nbsp;Cadrage&nbsp;fonctionnel
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#design">
                    Wireframes{" "}
                    <span style={{ color: theme.palette.primary.light }}>
                      &
                    </span>
                    &nbsp;Maquettes
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#dev">
                    Développement frontend{" "}
                    <span style={{ color: theme.palette.primary.light }}>
                      &
                    </span>
                    &nbsp;backend
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#dev">
                    Tests{" "}
                    <span style={{ color: theme.palette.primary.light }}>
                      &
                    </span>
                    &nbsp;Validation
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#infra">Déploiement continu</TimelineLink>
                }
              />
              <CustomTimelineItem
                content={<Typography>Évolution par&nbsp;itérations</Typography>}
                dotIcon={mdiReplay}
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#contract">Formation</TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#infra">
                    Livraison en&nbsp;production
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <Typography>
                    <span style={{ color: theme.palette.primary.light }}>
                      Résulat :{" "}
                    </span>
                    Produit&nbsp;évolutif
                  </Typography>
                }
                dotIcon={mdiCheck}
                connectorProps={{
                  sx: {
                    background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                  },
                }}
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#contract">Maintenance</TimelineLink>
                }
                connectorProps={{
                  sx: {
                    background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                  },
                }}
              />
            </Timeline>
          </ResponsiveStack>
        </SwiperSlide>
        <SwiperSlide>
          <ResponsiveStack rowGap={7.5}>
            <ResponsiveStack rowGap={1.5}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: "center",
                  fontWeight: "100",
                }}
              >
                Produit existant
              </Typography>
              <Typography
                variant="bodyMd"
                sx={{
                  fontStyle: "italic",
                  textAlign: "center",
                  color: theme.palette.text.secondary,
                  fontWeight: "300",
                }}
              >
                Adaptation à&nbsp;la&nbsp;réalité du&nbsp;projet
              </Typography>
            </ResponsiveStack>
            <Timeline
              position="alternate"
              sx={{
                margin: "0 !important",
                padding: "0 !important",
              }}
            >
              <CustomTimelineItem
                content={
                  <TimelineLink href="#project-management">
                    Audit technique{" "}
                    <span style={{ color: theme.palette.primary.light }}>
                      &
                    </span>
                    &nbsp;fonctionnel
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#project-management">
                    Cartographie du&nbsp;système&nbsp;existant
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#project-management">
                    Priorisation des&nbsp;corrections
                  </TimelineLink>
                }
              />
              <CustomTimelineItem
                content={<Typography>Évolution par&nbsp;itérations</Typography>}
                dotIcon={mdiReplay}
              />
              <CustomTimelineItem
                content={
                  <Typography>
                    <span style={{ color: theme.palette.primary.light }}>
                      Résulat :{" "}
                    </span>
                    Système&nbsp;fiabilisé
                  </Typography>
                }
                dotIcon={mdiCheck}
                connectorProps={{
                  sx: {
                    background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                  },
                }}
              />
              <CustomTimelineItem
                content={
                  <TimelineLink href="#contract">Maintenance</TimelineLink>
                }
                connectorProps={{
                  sx: {
                    background: `repeating-linear-gradient(to bottom, ${theme.palette.primary.dark} 0px, ${theme.palette.primary.dark} 2px, transparent 2px, transparent 4px)`,
                  },
                }}
              />
            </Timeline>
          </ResponsiveStack>
        </SwiperSlide>
        {!swiperLocked && (
          <>
            <CustomIconButton
              className="custom-swiper-button-prev"
              icon={mdiChevronLeft}
              iconSize={1.5}
              sx={{
                color: theme.palette.text.secondary,
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                left: 0,
              }}
            />
            <CustomIconButton
              className="custom-swiper-button-next"
              icon={mdiChevronRight}
              iconSize={1.5}
              sx={{
                color: theme.palette.text.secondary,
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 2,
                right: 0,
              }}
            />
          </>
        )}
      </Swiper>
    </ResponsiveStack>
  );
}
