import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";


export async function GET (request: Request) {
  const users = await prisma.user.findMany();

  return NextResponse.json({users}, {status: 200});
}

export async function POST (request: Request) {
  const { email, password, name, leaderId } = await request.json();
  const passwordHash = await hash(password, 10);
  let leader = leaderId;
  if (!leaderId) {
    const newLeader = "1";
    leader = newLeader;
  }
  const newUser = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
      name,
      leaderId: leader,
    }
  })
  return NextResponse.json({user: newUser}, {status: 201});
}