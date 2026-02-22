import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET (request: Request) {
  const leaveRequests = await prisma.leaveRequest.findMany();
  return NextResponse.json({leaveRequests}, {status: 200});
}