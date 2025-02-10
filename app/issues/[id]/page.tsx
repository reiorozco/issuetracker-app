import React from "react";
import { notFound } from "next/navigation";
import { Box, Grid } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import { EditIssueButton } from "@/app/issues/[id]/EditIssueButton";
import { IssueDetails } from "@/app/issues/[id]/IssueDetails";

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
    <Grid columns={{ initial: "1", sm: "2" }} gap="8">
      <Box>
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
}

export default IssueDetailPage;
