import React from "react";
import NextLink from "next/link";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { Flex, Table } from "@radix-ui/themes";
import { IssueStatusBadge, Link } from "@/app/components";
import { formatDate } from "@/app/utils";
import { Issue, Prisma, Status } from "@prisma/client";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sortOrder: Prisma.SortOrder;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

function IssueTable({ searchParams, issues }: Props) {
  return (
    <Table.Root variant="surface">
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
              {formatDate(issue.createdAt)}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

export const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export default IssueTable;
