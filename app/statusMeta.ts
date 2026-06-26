import { Status } from "@prisma/client";

type RadixColor = "red" | "blue" | "green";

interface StatusMeta {
  label: string;
  /** Radix accent name, used by Badge and other Radix components. */
  color: RadixColor;
  /** CSS var for charts/inline styling, kept in sync with `color`. */
  cssVar: string;
}

/**
 * Single source of truth for status presentation so badges, summary cards and
 * the chart share one color language. In Progress uses blue (not violet) to
 * stay distinct from the iris brand accent.
 */
export const statusMeta: Record<Status, StatusMeta> = {
  OPEN: { label: "Open", color: "red", cssVar: "var(--red-9)" },
  IN_PROGRESS: { label: "In Progress", color: "blue", cssVar: "var(--blue-9)" },
  CLOSED: { label: "Closed", color: "green", cssVar: "var(--green-9)" },
};
