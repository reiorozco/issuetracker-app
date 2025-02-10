"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { MdAdd, MdInfoOutline } from "react-icons/md";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { z } from "zod";
import { Issue } from "@prisma/client";
import { IssueSchema } from "@/app/validationSchemas";
import { ErrorMessage, TwSpinner } from "@/app/components";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof IssueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });

  const SimpleMDEOptions = useMemo(() => {
    return {
      // spellChecker: false,
      status: false,
    } as EasyMDE.Options;
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    console.log("IssueForm: ", data);

    try {
      setIsSubmitting(true);

      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (e) {
      setIsSubmitting(false);

      console.log("Error creating IssueForm: ", e);
      setError("An unexpected error occurred.");
    }
  });

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

      <form className="space-y-2" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="Title..."
          {...register("title")}
        >
          <TextField.Slot>
            <MdAdd height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description..."
              options={SimpleMDEOptions}
              {...field}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type="submit" disabled={isSubmitting}>
          Submit New Issue
          {isSubmitting && <TwSpinner />}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
