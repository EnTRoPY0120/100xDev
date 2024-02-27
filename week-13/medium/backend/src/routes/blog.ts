import { Hono } from "hono";
import { createPostInput, updatePostInput } from "@vj-npm/common-app";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
    prisma: any;
  };
}>();

blogRouter.post("/", async (c) => {
  const userId = c.get("userId");

  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = createPostInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid inputs" });
  }
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  c.status(201);
  return c.json({ id: post.id });
});

blogRouter.put("/", async (c) => {
  const userId = c.get("userId");
  const prisma = c.get("prisma");
  const body = await c.req.json();
  const { success } = updatePostInput.safeParse(body);
  if (!success) {
    c.status(403);
    return c.json({ message: "Invalid inputs" });
  }
  const post = await prisma.post.update({
    where: {
      id: body.id,
      authorId: userId,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  c.status(201);
  return c.json({ message: "Post has been updated" });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = c.get("prisma");
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  c.status(200);
  return c.json(post);
});
