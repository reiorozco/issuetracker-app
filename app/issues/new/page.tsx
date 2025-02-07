"use client";

import React, { useMemo, useState } from "react";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { MdAdd, MdInfoOutline } from "react-icons/md";
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
  const [error, setError] = useState("");

  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const SimpleMDEOptions = useMemo(() => {
    return {
      // spellChecker: false,
      status: false,
    } as EasyMDE.Options;
  }, []);

  return (
    <div className="max-w-xl space-y-2">
      {error && (
        <Callout.Root color="tomato">
          <Callout.Icon>
            <MdInfoOutline />
          </Callout.Icon>

          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="space-y-2"
        onSubmit={handleSubmit(async (data) => {
          console.log("IssueForm: ", data);

          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (e) {
            console.log("Error creating IssueForm: ", e);
            setError("An unexpected error occurred.");
          }
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
    </div>
  );
}

export default NewIssuePage;
