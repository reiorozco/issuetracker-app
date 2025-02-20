"use client";

import React from "react";
import axios from "axios";
import { Select, Skeleton } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import { User } from "@prisma/client";

function AssigneeSelect() {
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
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          {users?.map((user) => (
            <Select.Item key={user.email} value="1">
              {user.name}
            </Select.Item>
          ))}

          <Select.Item value="2">John Doe</Select.Item>
          <Select.Item value="3">Agus Clavijo</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
