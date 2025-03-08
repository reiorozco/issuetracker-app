"use client";

import React from "react";
import { Box, Card, Text } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IssuesCount {
  open: number;
  inProgress: number;
  closed: number;
}

interface Props {
  issuesCount: IssuesCount;
}

function IssueChart({ issuesCount }: Props) {
  const { open, inProgress, closed } = issuesCount;

  const data = [
    {
      label: "Open",
      value: open,
    },
    {
      label: "In Progress",
      value: inProgress,
    },
    {
      label: "Closed",
      value: closed,
    },
  ];

  return (
    <Card>
      <Box mb="4">
        <Text size="6" weight="bold">
          Issue Chart
        </Text>
      </Box>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="value"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart;
