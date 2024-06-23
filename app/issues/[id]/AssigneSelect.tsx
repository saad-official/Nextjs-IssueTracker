"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
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
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || "unassigned"}
        onValueChange={async (userId) => {
          try {
            await axios.patch("/api/issue/" + issue.id, {
              assignedToUserId: userId === "unassigned" ? null : userId,
            });
          } catch (error) {
            toast.error("Changes could not be saved");
          }
        }}
      >
        <Select.Trigger placeholder="Assign ..." />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions </Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user?.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
