import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

function DeleteIssueButton({ issueId }: { issueId: number }) {
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

            <AlertDialog.Action>
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
