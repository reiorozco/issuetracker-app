import React from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";
import {
  Box,
  Button,
  Card,
  Code,
  DataList,
  Flex,
  Grid,
  Heading,
  IconButton,
} from "@radix-ui/themes";
import { MdContentCopy, MdOutlineEdit } from "react-icons/md";
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
    <Grid columns={{ initial: "1", sm: "2" }} gap="8">
      <Flex direction="column" gap="4">
        <Heading>{issue.title}</Heading>

        <DataList.Root>
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
            <DataList.Label minWidth="88px">Created</DataList.Label>

            <DataList.Value>{issue.createdAt.toDateString()}</DataList.Value>
          </DataList.Item>
        </DataList.Root>

        <Card className="prose">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Flex>

      <Box>
        <Button>
          <MdOutlineEdit />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
      </Box>
    </Grid>
  );
}

export default IssueDetailPage;
