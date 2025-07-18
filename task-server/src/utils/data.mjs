import pkg from 'pg';

const {Pool} = pkg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'TaskManagerApp',
    password: 'mango',
    port: 5432,
});

export default pool;