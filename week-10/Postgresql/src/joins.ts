import { Client } from 'pg';

// Async function to fetch user data and their address together
export default async function getUserDetailsWithAddress(userId: string) {
    const client = new Client({
    connectionString:"DATABASE_URL"});

    try {
        await client.connect();
        const query = `
            SELECT u.id, u.name, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
        const result = await client.query(query, [userId]);

        if (result.rows.length > 0) {
            console.log('User and address found:', result.rows[0]);
            return result.rows[0];
        } else {
            console.log('No user or address found with the given ID.');
            return null;
        }
    } catch (err) {
        console.error('Error during fetching user and address:', err);
        throw err;
    } finally {
        await client.end();
    }
}
