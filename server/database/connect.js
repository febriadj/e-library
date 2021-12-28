const { Sequelize } = require('sequelize');

const { env } = process;
const conn = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: env.DB_DIALECT,
});

conn.sync({
  logging: false,
});

module.exports = conn;
