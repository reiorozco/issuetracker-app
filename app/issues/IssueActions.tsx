import React from "react";
import Link from "next/link";
import { Button, Flex } from "@radix-ui/themes";
import IssueStatusFilter from "@/app/issues/IssueStatusFilter";
import IssueSearch from "@/app/issues/IssueSearch";

function IssueActions() {
  return (
    <Flex justify="between" align="center" gap="3" wrap="wrap">
      <Flex align="center" gap="3" wrap="wrap" className="flex-1">
        <IssueSearch />
        <IssueStatusFilter />
      </Flex>

      <Button asChild>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
}

export default IssueActions;
