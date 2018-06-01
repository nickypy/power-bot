const { Pool } = require("pg");
const auth = require("./auth.js");
const pool = new Pool({
    connectionString: auth["url"]
});


// SCHEMA
// users {
//     userid TEXT PRIMARY KEY,
//     powerid TEXT
// }
// power {
//     id TEXT PRIMARY KEY,
//     text TEXT
// }

module.exports = pool;
