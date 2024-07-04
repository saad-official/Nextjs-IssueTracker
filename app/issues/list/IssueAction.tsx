import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import FilterIssue from "./FilterIssue";

const IssueAction = () => {
  return (
    <Flex className="mb-5" justify="between" align="center">
      <FilterIssue />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueAction;
