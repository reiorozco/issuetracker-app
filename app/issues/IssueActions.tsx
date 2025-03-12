import React from "react";
import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";

function IssueActions() {
  return (
    <Flex justify="between">
      <IssueStatusFilter />

      <Button asChild>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
}

export default IssueActions;
