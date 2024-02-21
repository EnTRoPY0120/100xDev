// write the code to create a table in the database
import { Client } from "pg";
import getUserDetailsWithAddress from "./joins";

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

async function createAddressTable() {
  try{await client.connect();
  const userTable = await client.query(`
  CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    city VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    street VARCHAR(255) NOT NULL,
    pincode VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE );
  `);
  console.log(userTable);
  } catch(err){
    console.error("Error creating the User Table",err) 
  } finally{
    await client.end();
  }
}
// createUsersTable().catch(console.error);
// createAddressTable();

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

async function insertIntoAddressTable(user_id:number,city:string,country:string,street:string,pincode:string){
 try{

  await client.connect();
  const insertUsers = `
  INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1,$2,$3,$4,$5) returning id`;
  const values = [user_id,city,country,street,pincode];

  const result = await client.query(insertUsers,values)
  console.log("Insertion success",result);
  } catch(err){
    console.error("Error during the insertion:",err)
  } finally{
    await client.end();
  }
}

// insertIntoUserTable('username5', 'user5@example.com', 'user_password').catch(console.error);
// insertIntoAddressTable(1, 'New York', 'USA', '123 Broadway St', '10001');

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



//getUsers("user5@example.com");

getUserDetailsWithAddress("1");


