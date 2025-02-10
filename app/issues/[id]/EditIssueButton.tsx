import React from "react";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "@radix-ui/themes";

export function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button>
      <MdOutlineEdit />

      <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
    </Button>
  );
}
