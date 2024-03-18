"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";

import "easymde/dist/easymde.min.css";

import dynamic from "next/dynamic";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/validationSchemas";
import { Spinner, ErrorMesage } from "@/app/components";
import { Issue } from "@prisma/client";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof createIssueSchema>;

interface IssueProps  {
  issue?: Issue
}

const IssueForm = ({issue}:IssueProps) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  const SendDataToApi = async (data: IssueFormData) => {
    try {
      setSubmitting(true);
      const res = await axios.post("/api/issue", data);
      console.log("success", res.data);
      console.log("data", data);
      router.push("/issues");
    } catch (error) {
      setError("Something Went Wrong");
      setSubmitting(false);
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
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        </TextField.Root>

        <ErrorMesage>{errors.title?.message}</ErrorMesage>

        <Controller
          name="description"
          defaultValue={issue?.description}
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />

        <ErrorMesage>{errors.description?.message}</ErrorMesage>

        <Button disabled={isSubmitting}>
          Submit the Issue {isSubmitting && <Spinner />}{" "}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
