const fs = require("fs");
const auth = JSON.parse(fs.readFileSync("auth.json"));

module.exports = auth;