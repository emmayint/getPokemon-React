const express = require('express');
const app = express();
const image_recognition = require('./image_recognition.js');
const twitter = require('./twitter.js');

const port = process.env.PORT_NUMBER || 80;

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get('/', (req, res) => res.send('Hello From Express!'));

app.get('/image_recognition', image_recognition);

app.get('/twitter', twitter);

app.listen(port, () => console.log(`Apollow 2 listening on port ${port}!`));