import { client } from "..";

/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
   try {
    const todo = `INSERT INTO todos (user_id,title,description) VALUES($1,$2,$3) RETURNING *;`;
    const values = [userId,title,description];
    const res = await client.query(todo,values);
    return res.rows[0];
   } catch (err){
    console.error("Error inserting into todos" ,err);
  } 
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try {
        const updateTodo = `UPDATE todos SET done = true WHERE id = $1 RETURNING *`;
        const values = [todoId];
        const res = await client.query(updateTodo,values);
        return res.rows[0];
    }catch (err){
    console.error("Error updating the todos" ,err);
  } 
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    try {
        const query = `SELECT * FROM todos WHERE user_id = $1`;
        const values = [userId];
        const res = await client.query(query, values);
        return res.rows || []; // Return todos or an empty array if no todos found
    } catch (err) {
        console.error("Error getting todos", err);
        throw err; // Rethrow the error to be handled by the caller
    }
}