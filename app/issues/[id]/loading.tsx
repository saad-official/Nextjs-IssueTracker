import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import Skelton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssueDetailPage = () => {
  return (
    <Box className="max-w-xl">
      <Heading>
        <Skelton />
      </Heading>
      <Flex gap={"3"} my={"2"}>
        <Skelton width={"5rem"} />
        <Skelton width={"5rem"} />
      </Flex>
      <Card className="prose mt-4">
        <Skelton count={3} />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;
