import React from "react";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

async function IssueDetailPage({ params }: Props) {
  if (isNaN(parseInt(params.id))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>Issue id: {issue.id}</p>
      <p>Issue title: {issue.title}</p>
      <p>Issue status: {issue.status}</p>
      <p>Issue created: {issue.createdAt.toDateString()}</p>
    </div>
  );
}

export default IssueDetailPage;
