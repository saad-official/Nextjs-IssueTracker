"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneeSelect = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await axios<User[]>("/api/users");
      setUsers(data);
    }

    fetchUser();
  }, []);

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
