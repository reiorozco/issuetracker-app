import React from "react";
import { Button, TextArea, TextField } from "@radix-ui/themes";
import { MdAdd } from "react-icons/md";

function NewIssuePage() {
  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root placeholder="Title...">
        <TextField.Slot>
          <MdAdd height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <TextArea placeholder="Description..." />

      <Button>Submit New Issue</Button>
    </div>
  );
}

export default NewIssuePage;
