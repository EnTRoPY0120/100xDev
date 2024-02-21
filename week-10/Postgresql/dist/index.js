"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// write the code to create a table in the database
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgresql://vijayarajdvr:JgVENtcO6iA9@ep-spring-frost-14728719.ap-southeast-1.aws.neon.tech/testDB?sslmode=require",
});
function createUsersTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const userTable = yield client.query(`
  CREATE TABLE users(
   id SERIAL PRIMARY KEY,
   name VARCHAR(50) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `);
            console.log(userTable);
        }
        catch (err) {
            console.error("Error creating the User Table", err);
        }
        finally {
            yield client.end();
        }
    });
}
//createUsersTable().catch(console.error);
function insertIntoUserTable(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const insertUsers = `
  INSERT INTO users (name , email,password ) VALUES ($1,$2,$3) returning id`;
            const values = [username, email, password];
            const result = yield client.query(insertUsers, values);
            console.log("Insertion success", result);
        }
        catch (err) {
            console.error("Error during the insertion:", err);
        }
        finally {
            yield client.end();
        }
    });
}
;
//insertIntoUserTable('username5', 'user5@example.com', 'user_password').catch(console.error);
function getUsers(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            const get = `SELECT * FROM users WHERE email = $1`;
            const values = [email];
            const result = yield client.query(get, values);
            if (result.rows.length > 0) {
                console.log("User found:", result.rows[0]);
                return result.rows[0]; // Return the user data
            }
        }
        catch (err) {
            console.error("Error fetching the user", err);
        }
        finally {
            yield client.end();
        }
    });
}
getUsers("user5@example.com");
