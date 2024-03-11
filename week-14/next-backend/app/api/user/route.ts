import signup from "@/app/actions/user";
import client from "@/db";
import { NextRequest } from "next/server";

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
}
