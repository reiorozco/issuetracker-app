"use client";

import dynamic from "next/dynamic";
import LoadingNewIssuePage from "@/app/issues/new/loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingNewIssuePage />,
});

export default function NewIssueForm() {
  return <IssueForm />;
}
