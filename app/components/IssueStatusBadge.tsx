import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";

const statusMap: Record<
  Status,
  { label: string; color: "green" | "red" | "violet" }
> = {
  CLOSED: { label: "Closed", color: "green" },
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
};

interface Props {
  status: Status;
}

function IssueStatusBadge({ status }: Props) {
  return (
    <div>
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </div>
  );
}

export default IssueStatusBadge;
