import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'Mdsalim@123',
    database: 'HolidaysDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export { pool as db };