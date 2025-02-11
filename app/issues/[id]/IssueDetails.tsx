import React from "react";
import ReactMarkdown from "react-markdown";
import { MdContentCopy } from "react-icons/md";
import {
  Card,
  Code,
  DataList,
  Flex,
  Heading,
  IconButton,
} from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";

interface Props {
  issue: Issue;
}

export default function IssueDetails({
  issue: { title, id, status, createdAt, description },
}: Props) {
  return (
    <Flex direction="column" gap="4">
      <Heading>{title}</Heading>

      <DataList.Root>
        <DataList.Item>
          <DataList.Label minWidth="88px">ID</DataList.Label>

          <DataList.Value>
            <Flex align="center" gap="2">
              <Code variant="ghost">{id}</Code>

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
            <IssueStatusBadge status={status} />
          </DataList.Value>
        </DataList.Item>

        <DataList.Item>
          <DataList.Label minWidth="88px">Created</DataList.Label>

          <DataList.Value>{createdAt.toDateString()}</DataList.Value>
        </DataList.Item>
      </DataList.Root>

      <Card className="prose max-w-full">
        <ReactMarkdown>{description}</ReactMarkdown>
      </Card>
    </Flex>
  );
}
