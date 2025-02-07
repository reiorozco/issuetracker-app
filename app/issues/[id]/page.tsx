import React from "react";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import {
  Card,
  Code,
  DataList,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
} from "@radix-ui/themes";
import { MdContentCopy } from "react-icons/md";
import { prisma } from "@/prisma/client";
import { IssueStatusBadge } from "@/app/components";

interface Props {
  params: { id: string };
}

async function IssueDetailPage({ params }: Props) {
  if (isNaN(parseInt(params.id))) notFound();
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) notFound();

  return (
    <Grid columns="2" gap="8">
      <Flex direction="column" gap="4">
        <Heading>{issue.title}</Heading>

        <Flex gap="4" align="center">
          <IssueStatusBadge status={issue.status} />

          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>

        <Card className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Flex>

      <DataList.Root className="h-fit">
        <DataList.Item>
          <DataList.Label minWidth="88px">Title</DataList.Label>

          <DataList.Value>{issue.title}</DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label minWidth="88px">ID</DataList.Label>

          <DataList.Value>
            <Flex align="center" gap="2">
              <Code variant="ghost">{issue.id}</Code>

              <IconButton
                size="1"
                aria-label="Copy value"
                color="gray"
                variant="ghost"
              >
                <MdContentCopy />
              </IconButton>
            </Flex>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item align="center">
          <DataList.Label minWidth="88px">Status</DataList.Label>

          <DataList.Value>
            <IssueStatusBadge status={issue.status} />
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label minWidth="88px">Description</DataList.Label>

          <DataList.Value>
            <div>
              <ReactMarkdown>{issue.description}</ReactMarkdown>
            </div>
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label minWidth="88px">Created</DataList.Label>

          <DataList.Value>{issue.createdAt.toDateString()}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Grid>
  );
}

export default IssueDetailPage;
