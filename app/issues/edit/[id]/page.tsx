import { notFound } from "next/navigation";
import React from "react";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "../../_components/issueFormSkeleton";

const IssueForm = dynamic(() => import("@/app/issues/_components/issueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params }: Props) => {
  const issue = await prisma?.issue.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!issue) notFound();

  return (
    <div>
      {" "}
      <IssueForm issue={issue} />
    </div>
  );
};

export default EditIssuePage;
