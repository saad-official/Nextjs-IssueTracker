"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/validationSchemas";
import ErrorMesage from "@/app/components/ErrorMesage";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

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

      <form className="space-y-3" onSubmit={handleSubmit(SendDataToApi)}>
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>

        <ErrorMesage>{errors.title?.message}</ErrorMesage>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMesage>{errors.description?.message}</ErrorMesage>

        <Button>Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
