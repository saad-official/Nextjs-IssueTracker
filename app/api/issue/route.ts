import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

import { z } from "zod";

const createIssueSchema = z.object({
  title: z.string().min(1, "Title is Required").max(255),
  description: z.string().min(1, "Description is Required"),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validartion = createIssueSchema.safeParse(body);

  if (!validartion.success)
    return NextResponse.json(validartion.error.errors, { status: 400 });

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
