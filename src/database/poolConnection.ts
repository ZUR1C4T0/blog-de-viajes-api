import { createPool } from 'mysql2/promise'

const pool = createPool({
  connectionLimit: 5,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS
})

export default pool
