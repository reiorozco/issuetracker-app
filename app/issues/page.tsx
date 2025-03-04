import React from "react";
import delay from "delay";
import { Flex, Table } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import IssueActions from "@/app/issues/IssueActions";
import { IssueStatusBadge, Link } from "@/app/components";
import { MdArrowUpward } from "react-icons/md";

import { Issue, Status } from "@prisma/client";
import NextLink from "next/link";

interface Props {
  searchParams: { status: Status; orderBy: keyof Issue };
}

async function IssuesPage({ searchParams }: Props) {
  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden md:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
  ];

  console.log("searchParams: %o", searchParams);

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
  });

  const result = await delay(1000, { value: "🦄" });
  console.log("Issues page loaded: ", result);

  return (
    <div>
      <h1>Issues Page</h1>

      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell key={col.label} className={col.className}>
                <NextLink
                  href={{ query: { ...searchParams, orderBy: col.value } }}
                >
                  <Flex align="center">
                    {col.label}
                    {col.value === searchParams.orderBy && <MdArrowUpward />}
                  </Flex>
                </NextLink>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>

                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>

              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuesPage;
