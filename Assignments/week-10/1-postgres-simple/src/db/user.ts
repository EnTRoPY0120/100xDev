import { client } from "..";
import { createTables } from "./setup";

//createTables();
/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
  try{
    const user = `INSERT INTO users (username,password,name) VALUES($1,$2,$3) RETURNING *`;
    const values = [username,password,name];
    const res = await client.query(user,values);
    return res.rows[0];
  }  catch (err){
    console.error("Error inserting into users" ,err);
  } 
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try{
        const getUser = `SELECT * FROM users WHERE id = $1 `;
        const values = [userId];
        const res = await client.query(getUser,values);
        return res.rows[0];
    } catch(err){
        console.error('Error retrieving user details' ,err);
    } 
    
}
