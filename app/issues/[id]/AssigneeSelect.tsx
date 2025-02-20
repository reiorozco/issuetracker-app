"use client";

import React from "react";
import axios from "axios";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { Issue, User } from "@prisma/client";

function AssigneeSelect({ issue }: { issue: Issue }) {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || "0"}
      onValueChange={(userId) => {
        axios.patch(`/api/issues/${issue.id}`, {
          assignedToUserId: userId === "0" ? null : userId,
        });
      }}
    >
      <Select.Trigger placeholder="Assign..." />

      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          <Select.Item value="0">Unassigned</Select.Item>

          {users?.map((user) => (
            <Select.Item key={user.email} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
