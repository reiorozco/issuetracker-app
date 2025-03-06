import React from "react";
import NextLink from "next/link";
import { prisma } from "@/prisma/client";
import { Avatar, Flex, Table } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell className="text-xl">
            Latest Issues
          </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Flex justify="between">
                <Flex direction="column" align="start" gap="2">
                  <NextLink href={`/issues/${issue.id}`}>
                    {issue.title}
                  </NextLink>

                  <IssueStatusBadge status={issue.status} />
                </Flex>

                {issue.assignedToUser && (
                  <Avatar
                    src={issue.assignedToUser.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                  />
                )}
              </Flex>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default LatestIssues;
