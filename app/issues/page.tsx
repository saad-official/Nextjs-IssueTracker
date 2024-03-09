"use client";
import React from "react";
import { Button, Table } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import Link from "next/link";

// eslint-disable-next-line @next/next/no-async-client-component
const IssuePage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/new">New Issue</Link>
        </Button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issues</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.ColumnHeaderCell>{issue.title}</Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell className="hidden md:table-cell">
                {issue.status}
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.ColumnHeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuePage;
