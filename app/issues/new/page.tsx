import React from "react";
import dynamic from "next/dynamic";
import LoadingNewIssuePage from "@/app/issues/new/loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingNewIssuePage />,
});

function NewIssuePage() {
  return <IssueForm />;
}

export default NewIssuePage;
