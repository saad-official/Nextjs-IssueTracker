import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) notFound();

  console.log("issue detail", issue);
  return <div>IssueDetailPage</div>;
};

export default IssueDetailPage;
