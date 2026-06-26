import React from "react";
import NextLink from "next/link";
import { Status } from "@prisma/client";
import { Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { statusMeta } from "@/app/statusMeta";

interface IssuesCount {
  open: number;
  inProgress: number;
  closed: number;
}

interface Props {
  issuesCount: IssuesCount;
}

function IssueSummary({ issuesCount }: Props) {
  const { open, inProgress, closed } = issuesCount;

  const cards: { value: number; status: Status }[] = [
    { value: open, status: "OPEN" },
    { value: inProgress, status: "IN_PROGRESS" },
    { value: closed, status: "CLOSED" },
  ];

  return (
    <Grid columns="3" gap="3" width="100%">
      {cards.map(({ value, status }) => {
        const { label, cssVar } = statusMeta[status];

        return (
          <Card key={status} asChild variant="surface" className="summary-card">
            <NextLink href={`/issues?status=${status}`}>
              <Flex direction="column" gap="2">
                <Flex align="center" gap="2">
                  <span
                    aria-hidden
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 9999,
                      backgroundColor: cssVar,
                    }}
                  />
                  <Text size="2" color="gray" weight="medium">
                    {label}
                  </Text>
                </Flex>

                <Heading as="h2" size="7" weight="bold">
                  {value}
                </Heading>
              </Flex>
            </NextLink>
          </Card>
        );
      })}
    </Grid>
  );
}

export default IssueSummary;
