const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
});
client.set('counter', 0);

app.get('/', (req, res) => {
    client.get('counter', (err, counter) => {
        res.send('Page Visitor Counter : ' + counter);
        client.set('counter', parseInt(counter) + 1);
    });
});

app.listen(9000, () => {
    console.log("Listen on port 9000");
});