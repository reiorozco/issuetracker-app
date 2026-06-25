import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { patchIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma/client";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { assignedToUserId, title, description, status } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId },
    });

    if (!user)
      return NextResponse.json({ error: "Invalid user." }, { status: 404 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue." }, { status: 404 });

  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      assignedToUserId,
      status,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue." }, { status: 404 });

  const deletedIssue = await prisma.issue.delete({
    where: { id: parseInt(id) },
  });

  return NextResponse.json(deletedIssue);
}
