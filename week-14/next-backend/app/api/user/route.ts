import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
  const body = await req.json();
  const res = await client.user.findUnique({
    where: {
      username: body.username,
    },
  });
  return Response.json({
    res,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);

  await client.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });

  return Response.json({
    message: "you logged in",
  });
}
