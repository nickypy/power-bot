const { Pool } = require("pg");
const auth = require("./auth.js");
const pool = new Pool({
    connectionString: auth["url"]
});

module.exports = pool;
