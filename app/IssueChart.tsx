"use client";

import React from "react";
import { Card, Flex, Heading } from "@radix-ui/themes";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { statusMeta } from "@/app/statusMeta";

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
    { label: statusMeta.OPEN.label, value: open, fill: statusMeta.OPEN.cssVar },
    {
      label: statusMeta.IN_PROGRESS.label,
      value: inProgress,
      fill: statusMeta.IN_PROGRESS.cssVar,
    },
    {
      label: statusMeta.CLOSED.label,
      value: closed,
      fill: statusMeta.CLOSED.cssVar,
    },
  ];

  return (
    <Card size="2">
      <Flex mb="4" direction="column" gap="1">
        <Heading as="h2" size="4">
          Issues by status
        </Heading>
      </Flex>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="var(--gray-a4)"
            vertical={false}
          />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={{ stroke: "var(--gray-a5)" }}
            tick={{ fill: "var(--gray-11)", fontSize: 13 }}
          />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--gray-11)", fontSize: 13 }}
          />
          <Tooltip
            cursor={{ fill: "var(--gray-a3)" }}
            contentStyle={{
              backgroundColor: "var(--color-panel-solid)",
              border: "1px solid var(--gray-a5)",
              borderRadius: "var(--radius-3)",
              color: "var(--gray-12)",
            }}
            labelStyle={{ color: "var(--gray-12)" }}
          />
          <Bar
            dataKey="value"
            barSize={56}
            radius={[6, 6, 0, 0]}
            animationDuration={600}
          >
            {data.map((entry) => (
              <Cell key={entry.label} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default IssueChart;
