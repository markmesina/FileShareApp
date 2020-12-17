require('dotenv').config();

module.exports = {
  SECRET: process.env.SECRET,
  DB: process.env.APP_DB,
  PORT: process.env.PORT,
};
