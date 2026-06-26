"use client";

import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const statusOptions: { label: string; value: Status }[] = [
  { label: "Open", value: "OPEN" },
  { label: "In progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

function StatusSelect({ issue }: { issue: Issue }) {
  const router = useRouter();

  const updateStatus = async (status: Status) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        status,
      });

      toast.success("Status updated.");
      router.refresh();
    } catch {
      toast.error("Changes could not be saved.");
    }
  };

  return (
    <>
      <Select.Root defaultValue={issue.status} onValueChange={updateStatus}>
        <Select.Trigger placeholder="Status..." />

        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Status</Select.Label>

            {statusOptions?.map((status) => (
              <Select.Item key={status.label} value={status.value}>
                {status.label}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
}

export default StatusSelect;
