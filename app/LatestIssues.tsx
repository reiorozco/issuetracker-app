import React from "react";
import NextLink from "next/link";
import { prisma } from "@/prisma/client";
import { Avatar, Box, Card, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";
import { formatDate } from "@/app/utils";

function initials(name?: string | null) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card size="2">
      <Heading as="h2" size="4" mb="4">
        Latest issues
      </Heading>

      {issues.length === 0 ? (
        <Text color="gray" size="2">
          No issues yet.
        </Text>
      ) : (
        <Flex direction="column">
          {issues.map((issue, index) => (
            <Flex
              key={issue.id}
              justify="between"
              align="center"
              gap="3"
              py="3"
              style={
                index < issues.length - 1
                  ? { borderBottom: "1px solid var(--gray-a4)" }
                  : undefined
              }
            >
              <Flex direction="column" gap="2" minWidth="0">
                <Link asChild size="2" weight="medium">
                  <NextLink href={`/issues/${issue.id}`}>{issue.title}</NextLink>
                </Link>

                <Flex align="center" gap="2">
                  <IssueStatusBadge status={issue.status} />
                  <Text size="1" color="gray">
                    {formatDate(issue.createdAt)}
                  </Text>
                </Flex>
              </Flex>

              {issue.assignedToUser && (
                <Box flexShrink="0">
                  <Avatar
                    src={issue.assignedToUser.image ?? undefined}
                    fallback={initials(issue.assignedToUser.name)}
                    size="2"
                    radius="full"
                  />
                </Box>
              )}
            </Flex>
          ))}
        </Flex>
      )}
    </Card>
  );
};

export default LatestIssues;
