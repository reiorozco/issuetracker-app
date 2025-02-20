"use client";

import React from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Issue, User } from "@prisma/client";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";

function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="2rem" />;

  if (error) return null;

  const assignIssue = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "0" ? null : userId,
      })
      .then(() => console.log("Patch issue ok."))
      .catch(() => toast.error("Changes could not be saved."));
  };

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "0"}
        onValueChange={assignIssue}
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

      <Toaster />
    </>
  );
}

const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });

export default AssigneeSelect;
