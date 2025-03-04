"use client";

import React, { useCallback } from "react";
import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";

const ALL_STATUS = "ALL";

type ExtendedStatus = typeof ALL_STATUS | Status;

const statuses: { label: string; value: ExtendedStatus }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "In Progress", value: "IN_PROGRESS" },
];

function IssueStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = useCallback(
    (status: ExtendedStatus) => {
      const params = new URLSearchParams();

      const currentOrderBy = searchParams.get("orderBy");
      const currentSortOrder = searchParams.get("sortOrder");

      if (status !== ALL_STATUS) {
        params.set("status", status);
      }
      if (currentOrderBy) {
        params.set("orderBy", currentOrderBy);
      }
      if (currentSortOrder) {
        params.set("sortOrder", currentSortOrder);
      }

      const queryString = params.toString() ? `?${params.toString()}` : "";
      router.push(`/issues/${queryString}`);
    },
    [router, searchParams],
  );

  return (
    <Select.Root
      defaultValue={searchParams.get("status") || ALL_STATUS}
      onValueChange={handleValueChange}
    >
      <Select.Trigger placeholder="Filter by status..." />

      <Select.Content>
        {statuses.map(({ label, value }) => (
          <Select.Item key={label} value={value || ALL_STATUS}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
