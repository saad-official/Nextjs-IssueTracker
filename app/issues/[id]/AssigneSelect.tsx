"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";

const AssigneeSelect = () => {
  //   const [users, setUsers] = useState<User[]>([]);

  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: [""],
    queryFn: () => axios.get<User[]>("/api/users").then((res) => res.data),
  });

  if (isLoading) return <Skeleton height={34} />;

  if (error) return null;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign ..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions </Select.Label>
          {users?.map((user) => (
            <Select.Item key={user.id} value={"1"}>
              {user?.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
