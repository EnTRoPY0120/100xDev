import { Hono } from "hono";
import { sign } from 'hono/jwt'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables:{
        prisma : any
    }
}>();

userRouter.post("/signup", async (c) => {
  const prisma = c.get('prisma');
  const body = await c.req.json();
  try{
  const user = await prisma.user.create({
    data:{
        email:body.email,
        password:body.password
    }
  })

  const token = await sign({id: user.id },c.env.JWT_SECRET);
  return c.json({token});
  } catch(err){
    c.status(403);
    return c.json({ error:"Error while signing up"})
  }

});

userRouter.post('/signin', async (c) => { 
  const prisma = c.get('prisma');
    const body = await c.req.json();
	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
      password : body.password
		}
	});

  if(!user){
    c.status(403);
    return c.json({error:" User not found"})
  }

  const token = await sign({ id: user.id}, c.env.JWT_SECRET);
  return c.json({
    message: "You have signed in successfully",
    token})
});


