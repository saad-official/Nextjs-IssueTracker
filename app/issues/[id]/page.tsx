import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Box, Flex, Grid } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }}>
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>

      <Box>
        <Flex direction="column" gap="4">
          <DeleteIssueButton issueId={issue.id} />
          <EditIssueButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
