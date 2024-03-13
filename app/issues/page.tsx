import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "../components/Link";
import IssueStatusBadge from "../components/issueStatusBadge";
import IssueAction from "./IssueAction";

const IssuePage = async () => {
  const issues = await prisma.issue.findMany();

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
            <Table.Row key={issue.id}>
              <Table.ColumnHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
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
