// this is the endpoint that calls the api `https://pokeapi.co/api/v2/pokemon/${num}`.
// This route will return the name and image of the pokemon
// accoring to the user imput in the query parameter "num"
// The name is returned as "res.data.forms[0].name"
// The image is returned from https://assets.pokemon.com/assets/cms2/img/pokedex/full/${001}.png

import React from "react";
import axios from "axios";

const PokeApi = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [response, setResponse] = React.useState({});

  const [userInput, setUserInput] = React.useState("25");
  const [pokemonName, setPokemonName] = React.useState("");
  const [pokemonNumber, setPokemonNumber] = React.useState("");

  const PORT = 4000;

  const addLeadingZeros = num => {
    if (num < 10) {
      let s = num + "";
      s = "00" + s;
      return s;
    }
    if (num / 10 < 10) {
      let s = num + "";
      s = "0" + s;
      return s;
    } else {
      return num;
    }
  };

  const handleSearch = () => {
    setIsLoading(true);
    let input = parseInt(userInput);
    get_pokemon(input).then(api_response => {
      //   setPokemonName(api_response.result.forms[0].name);
      setPokemonName(api_response.response);
      //   setPokemonNumber(addLeadingZeros(api_response.result.id));
      setPokemonNumber(addLeadingZeros(api_response.params.num));
    });
  };

  const get_pokemon = num => {
    return axios({
      // url: `https://pokeapi.co/api/v2/pokemon/${num}`,
      url: `http://localhost:${PORT}/pokeapi?num=${num}`,
      method: "get",
      responseType: "json"
    })
      .then(res => {
        console.log("checkpoint1");
        console.log(res.data.response);
        return res.data;
      })
      .catch(err => {
        let status = "ERROR";
        let result = err.message;
        return {
          status: status,
          result: result
        };
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const getResponseJsx = res => {
    if (res.body) {
      return (
        <div>
          <img src={userInput} alt={userInput} class="image" />
          {res.body.response.map((category, i) => (
            <div key={i}>
              <strong>{category.tag.en}</strong>
              <p>Confidence: {category.confidence}</p>
            </div>
          ))}
        </div>
      );
    }
    // else is an error with a message.
    return <div>{res.message}</div>;
  };
  return (
    <div className="pokeapi-page">
      <h2>PokeApi Component</h2>
      <p>Input a number from 1 to 800 to look up a pokemon.</p>
      <p></p>
      <span>
        <input value={userInput} onChange={e => setUserInput(e.target.value)} />
      </span>
      <span>
        <button onClick={() => handleSearch({ userInput })}>Search</button>
      </span>
      {isLoading ? <div>Loading...</div> : getResponseJsx(response)}
      <div className="pokemonStats">
        <p>{pokemonName ? `Name: ${pokemonName}` : ""}</p>
        <p>{pokemonNumber ? `Pokedex #: ${pokemonNumber}` : ""}</p>
      </div>
      <div className="pokemonImage">
        {pokemonNumber ? (
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`}
            alt="pokemon"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PokeApi;
