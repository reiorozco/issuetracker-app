"use client";

import React from "react";
import Link from "next/link";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { MdOutlineInbox } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";

function IssuesEmptyState() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const hasFilters = Boolean(searchParams.get("q") || searchParams.get("status"));

  return (
    <Card size="3">
      <Flex direction="column" align="center" gap="3" py="7" px="4">
        <Flex
          align="center"
          justify="center"
          style={{
            width: 48,
            height: 48,
            borderRadius: 9999,
            backgroundColor: "var(--accent-a3)",
            color: "var(--accent-11)",
          }}
        >
          <MdOutlineInbox size="1.5em" />
        </Flex>

        <Flex direction="column" align="center" gap="1">
          <Heading as="h2" size="4">
            {hasFilters ? "No matching issues" : "No issues yet"}
          </Heading>
          <Text size="2" color="gray" align="center">
            {hasFilters
              ? "Try adjusting your search or filters."
              : "Create your first issue to get started."}
          </Text>
        </Flex>

        <Flex gap="3" mt="2">
          {hasFilters && (
            <Button
              variant="soft"
              color="gray"
              onClick={() => router.push("/issues")}
            >
              Clear filters
            </Button>
          )}
          <Button asChild>
            <Link href="/issues/new">New Issue</Link>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default IssuesEmptyState;
