import "./theme-config.css";
import { Metadata } from "next";
import { prisma } from "@/prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import LatestIssues from "@/app/LatestIssues";
import IssueSummary from "@/app/IssueSummary";
import IssueChart from "@/app/IssueChart";

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  console.log(searchParams);

  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="4">
      <Flex direction="column" gap="4">
        <IssueSummary issuesCount={{ open, inProgress, closed }} />

        <IssueChart issuesCount={{ open, inProgress, closed }} />
      </Flex>

      <LatestIssues />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues.",
};
