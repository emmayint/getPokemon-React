const express = require('express');
const app = express();
const image_recognition = require('./image_recognition.js');
const pokemon = require('./pokemon.js');
const pokeapi = require('./pokeapi.js');

const port = process.env.PORT_NUMBER || 80;

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.get('/', (req, res) => res.send('Hello From Apollo2!'));

app.get('/image_recognition', image_recognition);

app.get('/pokemon', pokemon);

app.get('/pokeapi', pokeapi);

app.listen(port, () => console.log(`Apollow 2 listening on port ${port}!`));