import React from "react";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { Button } from "@radix-ui/themes";

export default function EditIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button asChild>
      <Link href={`/issues/${issueId}/edit`}>
        <MdOutlineEdit />
        Edit Issue
      </Link>
    </Button>
  );
}
