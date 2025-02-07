import React from "react";
import { Skeleton } from "@radix-ui/themes";

function LoadingNewIssuePage() {
  return (
    <div className="max-w-xl space-y-2">
      <Skeleton />

      <Skeleton width="575px" height="370px" />
    </div>
  );
}

export default LoadingNewIssuePage;
