import env from "dotenv";
import mysql from "mysql2/promise";

env.config();

const config: mysql.PoolOptions = {
  host: process.env["DB_HOST"],
  user: process.env["DB_USER"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_DATABASE"],
  decimalNumbers: true,
};

const pool = mysql.createPool(config);
const getDbConnection = async () => {
  return await pool.getConnection();
};

export { getDbConnection };
