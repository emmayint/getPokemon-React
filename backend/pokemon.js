// Wrapper Libraries: Node Server-side with auto caching: pokedex-promise-v2

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

const pokemon = (req, res) => {
  let params = req.query.num;
  let date = new Date();
  if (!isNaN(parseInt(params, 10)) && params <= 800 &&params >=1) {
    P.getPokemonByName(parseInt(params, 10), (response, error) =>{ // with callback
      if (!error) {
        res.send({
          status: 'OK',
          date: date,
          params: {
            num: params // This is the query parameter(s)
          },
          response: response.name,
        });
        console.log(response.name);
      }
      else {
        res.status(404).send(
          {
            status: "pokemon not found",
            date: date,
            params: {
              num: params // This is the query parameter(s)
            },
            response: response.name
          })
      }
    });
  }else {
    res.send(
      {
        status: "ERROR",
        date: date,
        params: {
          num: params // This is the query parameter(s)
        },
        response: "Query parameter must be integer from 1 to 800"
      }
    )
  }
}
module.exports = pokemon;
