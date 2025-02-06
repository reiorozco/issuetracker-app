"use client";

import React, { useMemo } from "react";
import { Button, TextField } from "@radix-ui/themes";
import { MdAdd } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import EasyMDE from "easymde";
import axios from "axios";

import "easymde/dist/easymde.min.css";

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const SimpleMDEOptions = useMemo(() => {
    return {
      // spellChecker: false,
      status: false,
    } as EasyMDE.Options;
  }, []);

  return (
    <form
      className="max-w-xl space-y-2"
      onSubmit={handleSubmit(async (data) => {
        console.log("IssueForm: ", data);

        await axios.post("/api/issues", data);
        router.push("/issues");
      })}
    >
      <TextField.Root placeholder="Title..." {...register("title")}>
        <TextField.Slot>
          <MdAdd height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE
            placeholder="Description..."
            options={SimpleMDEOptions}
            {...field}
          />
        )}
      />

      <Button type="submit">Submit New Issue</Button>
    </form>
  );
}

export default NewIssuePage;
