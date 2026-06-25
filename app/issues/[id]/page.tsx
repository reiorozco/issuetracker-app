import React, { cache } from "react";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";
import DeleteIssueButton from "@/app/issues/[id]/DeleteIssueButton";
import AssigneeSelect from "@/app/issues/[id]/AssigneeSelect";
import StatusSelect from "@/app/issues/[id]/StatusSelect";

interface Props {
  params: Promise<{ id: string }>;
}

const fetchUser = cache((issueId: number) => {
  return prisma.issue.findUnique({ where: { id: issueId } });
});

async function IssueDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  if (isNaN(parseInt(id))) notFound();

  const issue = await fetchUser(parseInt(id));
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <StatusSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await fetchUser(parseInt(id));

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export const dynamic = "force-dynamic";

export default IssueDetailPage;
