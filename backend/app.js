const express = require('express');
const path = require('path');
const app = express();
const image_recognition = require('./image_recognition.js');
const pokeapi = require('./pokeapi.js');
const cors = require('cors');

const port = 4000;
app.use(cors());
app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => res.send('Hello From Apollo2!'));

app.get('/image_recognition', image_recognition);

app.get('/pokeapi', pokeapi);

app.listen(port, () => console.log(`Apollow 2 listening on port ${port}!`));