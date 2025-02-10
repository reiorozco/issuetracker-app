import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { prisma } from "@/prisma/client";
import LoadingEditIssuePage from "@/app/issues/[id]/edit/loading";

interface Props {
  params: { id: string };
}

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <LoadingEditIssuePage />,
});

async function EditIssuePage({ params }: Props) {
  if (isNaN(parseInt(params.id))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
