import React from "react";
import { Metadata } from "next";
import delay from "delay";
import { prisma } from "@/prisma/client";
import IssueActions from "@/app/issues/IssueActions";
import { Pagination } from "@/app/components";
import { Issue, Prisma, Status } from "@prisma/client";
import IssueTable, { columns, IssueQuery } from "@/app/issues/IssueTable";
import { Flex } from "@radix-ui/themes";

interface Props {
  searchParams: Promise<IssueQuery>;
}

async function IssuesPage({ searchParams }: Props) {
  const query = await searchParams;
  const validStatus = Object.values(Status).includes(query.status)
    ? query.status
    : undefined;
  const where = { status: validStatus };
  const isValidSortOrder = Object.values(Prisma.SortOrder).includes(
    query.sortOrder,
  );
  const isValidOrderBy = columns.some((col) => col.value === query.orderBy);

  const orderBy =
    isValidOrderBy && isValidSortOrder
      ? { [query.orderBy]: query.sortOrder }
      : undefined;

  const page = Number(query.page) || 1;
  const pageSize = 7;

  const issues: Issue[] = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  const result = await delay(1000, { value: "🦄" });
  console.log("Issues page loaded: ", result);

  return (
    <Flex direction="column" gap="4">
      <IssueActions />

      <IssueTable issues={issues} searchParams={query} />

      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all project issues.",
};

export const dynamic = "force-dynamic";

export default IssuesPage;
