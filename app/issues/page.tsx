import React from "react";
import Link from "next/link";
import delay from "delay";
import { Table } from "@radix-ui/themes";
import { prisma } from "@/prisma/client";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import IssueActions from "@/app/issues/IssueActions";

async function IssuesPage() {
  const issues = await prisma.issue.findMany();

  const result = await delay(2000, { value: "🦄" });
  console.log("Issues page loaded: ", result);

  return (
    <div>
      <h1>Issues Page</h1>

      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
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

export default IssuesPage;
