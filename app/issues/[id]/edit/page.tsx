import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/prisma/client";
import EditIssueForm from "@/app/issues/[id]/edit/EditIssueForm";

interface Props {
  params: Promise<{ id: string }>;
}

async function EditIssuePage({ params }: Props) {
  const { id } = await params;
  if (isNaN(parseInt(id))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return <EditIssueForm issue={issue} />;
}

export default EditIssuePage;
