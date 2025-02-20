"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select } from "@radix-ui/themes";
import { User } from "@prisma/client";

function AssigneeSelect() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get<User[]>("/api/users");

      setUsers(data);
    };

    fetchUsers().then(() => console.log("Fetch users ok"));
  }, []);

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          {users.map((user) => (
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
