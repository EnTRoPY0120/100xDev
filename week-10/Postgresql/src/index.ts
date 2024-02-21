// write the code to create a table in the database
import { Client } from "pg";

const client = new Client({
  connectionString:
    "postgresql://vijayarajdvr:JgVENtcO6iA9@ep-spring-frost-14728719.ap-southeast-1.aws.neon.tech/testDB?sslmode=require",
});

async function createUsersTable() {
  try{await client.connect();
  const userTable = await client.query(`
  CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
  console.log(userTable);
  } catch(err){
    console.error("Error creating the User Table",err) 
  } finally{
    await client.end();
  }
}

//createUsersTable().catch(console.error);

async function insertIntoUserTable(username :string,email :string, password:string){
 try{

  await client.connect();
  const insertUsers = `
  INSERT INTO users (name , email,password ) VALUES ($1,$2,$3) returning id`;
  const values = [username, email,password];

  const result = await client.query(insertUsers,values)
  console.log("Insertion success",result);
  } catch(err){
    console.error("Error during the insertion:",err)
  } finally{
    await client.end();
  }
};

//insertIntoUserTable('username5', 'user5@example.com', 'user_password').catch(console.error);


async function getUsers(email: string){
  try{
    await client.connect();
    const get = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await client.query(get,values);

    if(result.rows.length > 0){
      console.log("User found:" ,result.rows[0]) ;
      return result.rows[0]; // Return the user data
    }
  } catch(err){
    console.error("Error fetching the user",err);
  }
  finally{
    await client.end();
  }
}

getUsers("user5@example.com");