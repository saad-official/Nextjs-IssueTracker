import { Button, Table } from "@radix-ui/themes";
import React from "react";

import { Skeleton } from "@radix-ui/themes";
import "react-loading-skeleton/dist/skeleton.css";
import Link from "next/link";
import IssueAction from "./IssueAction";

const LoadingIssuePage = () => {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div>
        <IssueAction />
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
            <Table.Row key={issue}>
              <Table.ColumnHeaderCell>
                <Skeleton />
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell className="hidden md:table-cell">
                <Skeleton />
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell className="hidden md:table-cell">
                <Skeleton />
              </Table.ColumnHeaderCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default LoadingIssuePage;
