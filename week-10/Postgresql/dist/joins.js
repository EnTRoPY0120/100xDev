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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Async function to fetch user data and their address together
function getUserDetailsWithAddress(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new pg_1.Client({
            connectionString: process.env.DATABASE_URL
        });
        try {
            yield client.connect();
            const query = `
            SELECT u.id, u.name, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
            const result = yield client.query(query, [userId]);
            if (result.rows.length > 0) {
                console.log('User and address found:', result.rows[0]);
                return result.rows[0];
            }
            else {
                console.log('No user or address found with the given ID.');
                return null;
            }
        }
        catch (err) {
            console.error('Error during fetching user and address:', err);
            throw err;
        }
        finally {
            yield client.end();
        }
    });
}
exports.default = getUserDetailsWithAddress;
