const config = {};
require('dotenv').config();

config.serverPort = 8080;

config.dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    host: "localhost",
    port: 3306,
    database: process.env.DB_NAME,
};

module.exports = config;