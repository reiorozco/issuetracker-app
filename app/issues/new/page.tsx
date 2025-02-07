"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { MdAdd, MdInfoOutline } from "react-icons/md";
import SimpleMDE from "react-simplemde-editor";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { z } from "zod";
import { createIssueSchema } from "@/app/validationSchemas";

type IssueForm = z.infer<typeof createIssueSchema>;

function NewIssuePage() {
  const [error, setError] = useState("");

  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const SimpleMDEOptions = useMemo(() => {
    return {
      // spellChecker: false,
      status: false,
    } as EasyMDE.Options;
  }, []);

  const handleOnSubmit = async (data: IssueForm) => {
    console.log("IssueForm: ", data);

    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (e) {
      console.log("Error creating IssueForm: ", e);
      setError("An unexpected error occurred.");
    }
  };

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

      <form className="space-y-2" onSubmit={handleSubmit(handleOnSubmit)}>
        <TextField.Root placeholder="Title..." {...register("title")}>
          <TextField.Slot>
            <MdAdd height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        {errors.title && (
          <Text color="tomato" as="p">
            {errors.title.message}
          </Text>
        )}

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
        {errors.description && (
          <Text color="tomato" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;
