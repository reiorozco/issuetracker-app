import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Button } from "@radix-ui/themes";

function DeleteIssueButton({ issueId }: { issueId: number }) {
  return (
    <Button color="tomato">
      <MdDeleteOutline />
      Edit Issue
    </Button>
  );
}

export default DeleteIssueButton;
