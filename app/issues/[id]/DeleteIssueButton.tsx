"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

function DeleteIssueButton({ issueId }: { issueId: number }) {
  const router = useRouter();

  const handleDelete = async () => {
    await axios.delete(`/api/issues/${issueId}`);

    router.push("/issues");
    router.refresh();
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="tomato">
            <MdDeleteOutline />
            Edit Issue
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

            <AlertDialog.Action onClick={handleDelete}>
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
