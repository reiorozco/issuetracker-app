"use client";

import React, { useMemo } from "react";
import { Button, TextField } from "@radix-ui/themes";
import { MdAdd } from "react-icons/md";
import SimpleMDE from "react-simplemde-editor";
import EasyMDE from "easymde";

import "easymde/dist/easymde.min.css";

function NewIssuePage() {
  const SimpleMDEOptions = useMemo(() => {
    return {
      // spellChecker: false,
      status: false,
    } as EasyMDE.Options;
  }, []);

  return (
    <div className="max-w-xl space-y-2">
      <TextField.Root placeholder="Title...">
        <TextField.Slot>
          <MdAdd height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <SimpleMDE placeholder="Description..." options={SimpleMDEOptions} />

      <Button>Submit New Issue</Button>
    </div>
  );
}

export default NewIssuePage;
