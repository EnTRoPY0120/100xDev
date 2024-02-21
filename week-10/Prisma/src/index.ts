import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string) {
 const res = await prisma.user.create({
    data:{
        username,
        password,
        firstName,
        lastName
    },
    select:{
        id :true,
        firstName:true,
        lastName:true
    }
 }) 
 console.log(res);
}

 insertUser("vijay@gmail.com", "my_secret_pass","Vijay", "Albus");


interface UpdateParams{ 
    firstName :string,
    lastName : string
}

async function updateUsers(username:string ,{ firstName,lastName} :UpdateParams){
    const res = await prisma.user.update({
        where:{
            username
        },
        data:{
            firstName,
            lastName
        }
    })
    console.log(res);
}

//updateUsers("vijay0120",{firstName:"Albus",lastName:"Severus"});


async function getUsers(username:string){
    const res = await prisma.user.findUnique({
        where:{
            username
        }
    })
    console.log(res);
}

//getUsers("vijay123@gmail.com")