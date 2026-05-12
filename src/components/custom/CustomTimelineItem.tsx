import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector, {
  type TimelineConnectorProps,
} from "@mui/lab/TimelineConnector";
import TimelineContent, {
  type TimelineContentProps,
} from "@mui/lab/TimelineContent";
import TimelineDot, { type TimelineDotProps } from "@mui/lab/TimelineDot";
import TimelineOppositeContent, {
  type TimelineOppositeContentProps,
} from "@mui/lab/TimelineOppositeContent";
import Icon from "@mdi/react";
import { useTheme } from "@mui/material";

export default function CustomTimelineItem({
  content,
  contentProps,
  oppositeContent,
  oppositeContentProps,
  dotIcon,
  dotProps,
  connector = true,
  connectorProps,
}: {
  content: React.ReactNode;
  contentProps?: TimelineContentProps;
  oppositeContent?: React.ReactNode;
  oppositeContentProps?: TimelineOppositeContentProps;
  dotIcon?: string;
  dotProps?: TimelineDotProps;
  connector?: boolean;
  connectorProps?: TimelineConnectorProps;
}) {
  const theme = useTheme();
  return (
    <TimelineItem sx={{ minHeight: "42px" }}>
      {oppositeContent && (
        <TimelineOppositeContent
          {...oppositeContentProps}
          sx={{
            color: "text.secondary",
            ...oppositeContentProps?.sx,
          }}
        >
          {oppositeContent}
        </TimelineOppositeContent>
      )}
      <TimelineSeparator>
        <TimelineDot
          color="primary"
          variant="outlined"
          {...dotProps}
          sx={{
            marginY: "0px",
            borderWidth: "1px",
            padding: dotIcon ? "7px" : "5px",
            ...dotProps?.sx,
          }}
        >
          {dotIcon && (
            <Icon
              path={dotIcon}
              size={0.8333}
              style={{ color: theme.palette.primary.light }}
            />
          )}
        </TimelineDot>
        {connector && (
          <TimelineConnector
            {...connectorProps}
            sx={{
              width: "1px",
              minHeight: "24px",
              backgroundColor: theme.palette.primary.main,
              ...connectorProps?.sx,
            }}
          />
        )}
      </TimelineSeparator>
      <TimelineContent
        {...contentProps}
        sx={{
          paddingY: "0px",
          marginTop: dotIcon ? "6px" : "-6px",
          ...contentProps?.sx,
        }}
      >
        {content}
      </TimelineContent>
    </TimelineItem>
  );
}
