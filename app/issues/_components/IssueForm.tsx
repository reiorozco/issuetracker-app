"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import { MdAdd } from "react-icons/md";
import EasyMDE from "easymde";
import "easymde/dist/easymde.min.css";
import axios from "axios";
import { z } from "zod";
import { Issue } from "@prisma/client";
import { issueSchema } from "@/app/validationSchemas";
import { ErrorMessage, TwSpinner } from "@/app/components";

type IssueFormData = z.infer<typeof issueSchema>;

function IssueForm({ issue }: { issue?: Issue }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const SimpleMDEOptions = useMemo(() => {
    return {
      // spellChecker: false,
      status: false,
    } as EasyMDE.Options;
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);

      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);

      toast.success(issue ? "Issue updated." : "Issue created.");
      router.push("/issues");
      router.refresh();
    } catch {
      setIsSubmitting(false);
      toast.error("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl space-y-2">
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
          {issue ? "Update Issue" : "Submit New Issue"}
          {isSubmitting && <TwSpinner />}
        </Button>
      </form>
    </div>
  );
}

export default IssueForm;
