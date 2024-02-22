import { Client } from 'pg'
import { DB } from './config';

export const client = new Client({
    connectionString: DB
});
