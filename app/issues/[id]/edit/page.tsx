import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/prisma/client";
import IssueForm from "@/app/issues/_components/IssueForm";

interface Props {
  params: { id: string };
}

async function EditIssuePage({ params }: Props) {
  if (isNaN(parseInt(params.id))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
