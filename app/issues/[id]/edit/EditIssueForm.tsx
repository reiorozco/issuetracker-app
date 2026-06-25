"use client";

import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
import LoadingEditIssuePage from "@/app/issues/[id]/edit/loading";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingEditIssuePage />,
});

export default function EditIssueForm({ issue }: { issue: Issue }) {
  return <IssueForm issue={issue} />;
}
