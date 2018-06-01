const rl = require("readline-sync");
const snoowrap = require("snoowrap");
const auth = require("./auth.js");
const connection = require("./db.js");

const username = rl.question("> Username: ");
const password = rl.question(`> Password for /u/${username}: `, {
    hideEchoBack: true
});
const subreddit = rl.question("> Subreddit: ");


const reddit = new snoowrap({
    userAgent: "Node.js",
    clientId: auth["client-id"],
    clientSecret: auth["client-secret"],
    username: username,
    password: password
});

reddit
    .getSubreddit(subreddit)
    .getNew({ time: "new", limit: 1000 })
    .then(populateDB);

function populateDB(posts) {
    posts.forEach(post => {
        const query = "INSERT INTO powers VALUES ($1, $2) RETURNING *";
        connection
            .query(query, [post.id, post.title])
            .then(res => console.log(res.rows[0]))
            .catch(e => console.error(e.stack));
    });
}
