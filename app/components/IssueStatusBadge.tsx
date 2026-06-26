import React from "react";
import { Badge } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { statusMeta } from "@/app/statusMeta";

interface Props {
  status: Status;
}

function IssueStatusBadge({ status }: Props) {
  const { label, color } = statusMeta[status];

  return (
    <Badge color={color} variant="soft" radius="full">
      {label}
    </Badge>
  );
}

export default IssueStatusBadge;
