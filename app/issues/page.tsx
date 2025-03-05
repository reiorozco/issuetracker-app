import React from "react";
import NextLink from "next/link";
import delay from "delay";
import { Flex, Table } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import IssueActions from "@/app/issues/IssueActions";
import { IssueStatusBadge, Link } from "@/app/components";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { Issue, Prisma, Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";

interface SearchParams {
  status: Status;
  orderBy: keyof Issue;
  sortOrder: Prisma.SortOrder;
  page: string;
}

interface Props {
  searchParams: SearchParams;
}

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

async function IssuesPage({ searchParams }: Props) {
  const validStatus = Object.values(Status).includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status: validStatus };
  const isValidSortOrder = Object.values(Prisma.SortOrder).includes(
    searchParams.sortOrder,
  );
  const isValidOrderBy = columns.some(
    (col) => col.value === searchParams.orderBy,
  );

  const orderBy =
    isValidOrderBy && isValidSortOrder
      ? { [searchParams.orderBy]: searchParams.sortOrder }
      : undefined;

  const page = Number(searchParams.page) || 1;
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
    <div>
      <h1>Issues Page</h1>

      <IssueActions />

      <Table.Root variant="surface" mb="2">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeaderCell key={col.label} className={col.className}>
                <NextLink
                  href={{
                    query: {
                      ...searchParams,
                      orderBy: col.value,
                      sortOrder:
                        searchParams.sortOrder === "asc" ? "desc" : "asc",
                    },
                  }}
                >
                  <Flex align="center">
                    {col.label}
                    {col.value === searchParams.orderBy &&
                      searchParams.sortOrder === "asc" && <MdArrowUpward />}
                    {col.value === searchParams.orderBy &&
                      searchParams.sortOrder === "desc" && <MdArrowDownward />}
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

      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuesPage;
