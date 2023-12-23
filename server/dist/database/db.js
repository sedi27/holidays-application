"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = require("mysql2/promise");
const pool = (0, promise_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: 'Mdsalim@123',
    database: 'HolidaysDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
exports.db = pool;
