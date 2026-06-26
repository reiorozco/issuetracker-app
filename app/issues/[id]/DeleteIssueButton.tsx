"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { TwSpinner } from "@/app/components";

function DeleteIssueButton({ issueId }: { issueId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);

      toast.success("Issue deleted.");
      router.push("/issues");
      router.refresh();
    } catch {
      setIsDeleting(false);
      toast.error("This issue could not be deleted.");
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="tomato" disabled={isDeleting}>
            {!isDeleting && <MdDeleteOutline />}
            Delete Issue
            {isDeleting && <TwSpinner />}
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Confirm Delete</AlertDialog.Title>

          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action onClick={deleteIssue}>
              <Button variant="solid" color="tomato">
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}

export default DeleteIssueButton;
