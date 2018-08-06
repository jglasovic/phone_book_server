require('dotenv').config({ path: '.env' });
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: 'localhost',
  db_url: `mongodb://localhost:27017/${process.env.DB_NAME}`,
  dialect: process.env.DB_DIALECT,
  port: process.env.SERVER_PORT,
  secretKey: process.env.SECRET_KEY,
  options: {
    expiresIn: process.env.SECRET_KEY_EXP,
  },
};
