// https://discordapp.com/oauth2/authorize?&client_id=446791023310667776&scope=bot&permissions=0

const Discord = require("discord.js");
const client = new Discord.Client();
const connection = require("./db.js");
const auth = require("./auth.js");

const getPower = "SELECT * FROM powers ORDER BY random() LIMIT 1;";
const insertUsers = "INSERT INTO users VALUES($1, $2)";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("$power, $new", { type: "STREAMING" });
});

client.on("message", msg => {
    if (msg.content === "$power") {
        const userId = msg.author["id"];
        const query = `SELECT powerid FROM users WHERE userid='${userId}';`;

        connection
            .query(query)
            .then(res => {
                const result = res.rows[0];

                if (result === undefined) {
                    // assign new power
                    connection
                        .query(getPower)
                        .then(res => {
                            const powerId = res.rows[0]["id"];
                            const powerText = res.rows[0]["text"];
                            connection
                                .query(insertUsers, [userId, powerId])
                                .then(res => msg.reply(powerText))
                                .catch(e => console.error(e.stack));
                        })
                        .catch(e => console.error(e.stack));

                } else {
                    // reply with their power
                    const q = `select powers.text FROM users INNER JOIN powers ON users.powerid=powers.id WHERE powers.id='${result["powerid"]}';`;

                    connection
                        .query(q)
                        .then(res => {
                            msg.reply(`you already have this power: ${res.rows[0]["text"]}`)
                        })
                        .catch(e => console.error(e.stack));
                }
            })
            .catch(e => console.error(e.stack));
    } else if (msg.content === "$new") {
        const userId = msg.author["id"];

        connection
            .query(`DELETE FROM users WHERE userid='${userId}'`)
            .then()
            .catch(e => console.error(e.stack))

        connection
            .query(getPower)
            .then(res => {
                const powerId = res.rows[0]["id"];
                const powerText = res.rows[0]["text"];
                connection
                    .query(insertUsers, [userId, powerId])
                    .then(res => msg.reply(powerText))
                    .catch(e => console.error(e.stack));
            })
            .catch(e => console.error(e.stack));
    }
});

client.login(auth["bot-token"]);
