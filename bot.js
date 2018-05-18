// https://discordapp.com/oauth2/authorize?&client_id=446791023310667776&scope=bot&permissions=0

const Discord = require("discord.js");
const client = new Discord.Client();
const connection = require("./db.js");
const auth = require("./auth.js");

const query = "SELECT text FROM powers ORDER BY random() LIMIT 1;";

client.user.setActivity("getting more $power", { type: "STREAMING" });

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    if (msg.content === "$power") {
        connection
            .query(query)
            .then(res => msg.reply(res.rows[0]["text"]))
            .catch(e => console.error(e.stack));
    }
});

client.login(auth["bot-key"]);
