import pkg from 'pg';

// Импорт базы данных postgres
const {Pool} = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TaskManagerApp',
    password: 'mango',
    port: 5432,
});

export default pool;