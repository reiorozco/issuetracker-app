import React from "react";
import { Select } from "@radix-ui/themes";

function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          <Select.Item value="1">Rei Orozco</Select.Item>
          <Select.Item value="2">John Doe</Select.Item>
          <Select.Item value="3">Agus Clavijo</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
