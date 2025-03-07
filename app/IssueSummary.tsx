import React from "react";
import NextLink from "next/link";
import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

function IssueSummary({ open, closed, inProgress }: Props) {
  const statuses: { label: string; value: number; status: Status }[] = [
    {
      label: "Open Issues",
      value: open,
      status: "OPEN",
    },
    {
      label: "In-progress Issues",
      value: inProgress,
      status: "IN_PROGRESS",
    },
    {
      label: "Closed Issues",
      value: closed,
      status: "CLOSED",
    },
  ];

  return (
    <Flex gap="4">
      {statuses.map(({ label, status, value }) => (
        <Card key={label} asChild variant="surface">
          <NextLink href={`/issues?status=${status}`}>
            <Flex direction="column" gap="2">
              <Text as="div" >
                {label}
              </Text>

              <Text as="div"  weight="bold">
                {value}
              </Text>
            </Flex>
          </NextLink>
        </Card>
      ))}
    </Flex>
  );
}

export default IssueSummary;
