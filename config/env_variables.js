const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  // port
  PORT: process.env.PORT,

  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_DIALECT: process.env.DATABASE_DIALECT,
  NODE_ENV: process.env.NODE_ENV,

  // Email config
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,

  // role names
  SUPER_ADMIN_ROLE_NAME: 'super admin',
  USER_ROLE_NAME: 'user',
  ADMIN_ROLE_NAME: 'admin',

  JWT_USER_SECRET: process.env.JWT_USER_SECRET,
};

