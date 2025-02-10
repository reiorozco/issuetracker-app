import React from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Code,
  DataList,
  Flex,
  Grid,
  Heading,
  Skeleton,
  Text,
} from "@radix-ui/themes";

function LoadingIssueDetailPage() {
  const issue = {
    id: 123456789,
    title: "Title issue",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque felis tellus, efficitur id convallis a, viverra eget libero. Nam magnaterat, fringilla sed commodo sed, aliquet nec magna.",
    status: "OPEN",
    createdAt: new Date(),
  };

  return (
    <Grid columns="2" gap="8">
      <Flex direction="column" gap="4">
        <Skeleton>
          <Heading>{issue.title}</Heading>
        </Skeleton>

        <DataList.Root>
          <DataList.Item>
            <DataList.Label minWidth="88px">ID</DataList.Label>

            <DataList.Value>
              <Skeleton>
                <Code variant="ghost">{issue.id}</Code>
              </Skeleton>
            </DataList.Value>
          </DataList.Item>

          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Status</DataList.Label>

            <DataList.Value>
              <Skeleton>
                <Box>
                  <Badge color="orange">{issue.status}</Badge>
                </Box>
              </Skeleton>
            </DataList.Value>
          </DataList.Item>

          <DataList.Item>
            <DataList.Label minWidth="88px">Created</DataList.Label>

            <DataList.Value>
              <Skeleton>{issue.createdAt.toDateString()}</Skeleton>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        <Card className="prose">
          <Text as="p">
            <Skeleton>{issue.description}</Skeleton>
          </Text>
        </Card>
      </Flex>

      <Box>
        <Skeleton>
          <Button>Edit Issue</Button>
        </Skeleton>
      </Box>
    </Grid>
  );
}

export default LoadingIssueDetailPage;
