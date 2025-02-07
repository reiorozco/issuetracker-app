import React from "react";
import Link from "next/link";
import { Button } from "@radix-ui/themes";

function IssueActions() {
  return (
    <div className="my-4">
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}

export default IssueActions;
