"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { Controller, useForm } from "react-hook-form";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const SendDataToApi = async (data: IssueForm) => {
    try {
      const res = await axios.post("/api/issue", data);
      console.log("success", res.data);
      console.log("data", data);
      router.push("/issues");
    } catch (error) {
      setError("Something Went Wrong");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="space-y-3"
        onSubmit={handleSubmit(SendDataToApi)}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <Button>Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
