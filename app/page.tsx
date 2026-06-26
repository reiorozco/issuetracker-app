import { Metadata } from "next";
import { prisma } from "@/prisma/client";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import IssueChart from "@/app/IssueChart";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="1">
        <Heading as="h1" size="6">
          Dashboard
        </Heading>
        <Text color="gray" size="2">
          An overview of your project issues.
        </Text>
      </Flex>

      <Grid columns={{ initial: "1", md: "2" }} gap="4" align="start">
        <Flex direction="column" gap="4">
          <IssueSummary issuesCount={{ open, inProgress, closed }} />

          <IssueChart issuesCount={{ open, inProgress, closed }} />
        </Flex>

        <LatestIssues />
      </Grid>
    </Flex>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues.",
};
