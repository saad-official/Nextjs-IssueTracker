"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const FilterIssue = () => {
  const router = useRouter();

  const statuses: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "CLOSED" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status ? `?status=${status}` : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter Issue .." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status?.value} value={status.value ?? "ALL"}>
            {status?.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default FilterIssue;
