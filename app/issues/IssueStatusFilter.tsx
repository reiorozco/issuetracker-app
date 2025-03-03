"use client";

import React from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

const statuses: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

function IssueStatusFilter() {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === "ALL" ? "" : `?status=${status}`;

        router.push("/issues/" + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />

      <Select.Content>
        {statuses.map(({ label, value }) => (
          <Select.Item key={label} value={value || "ALL"}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
