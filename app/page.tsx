import "./theme-config.css";
import LatestIssues from "@/app/LatestIssues";
import { Flex } from "@radix-ui/themes";
import IssueSummary from "@/app/IssueSummary";
import { prisma } from "@/prisma/client";

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
    <Flex direction="column" gap="4">
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />

      <LatestIssues />
    </Flex>
  );
}
