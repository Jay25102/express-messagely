/** Database connection for messagely. */


const { Client } = require("pg");
const { DB_URI } = require("./config");

const client = new Client({
    user: "client",
    password: "password",
    host: "localhost",
    port: 5432,
    database: DB_URI
});

client.connect();


module.exports = client;
