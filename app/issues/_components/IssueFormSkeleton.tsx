import React from "react";
import { Box, Skeleton } from "@radix-ui/themes";

function IssueFormSkeleton() {
  return (
    <Box className="max-w-xl space-y-2">
      <Skeleton height="2rem" />

      <Skeleton height="23rem" />
    </Box>
  );
}

export default IssueFormSkeleton;
