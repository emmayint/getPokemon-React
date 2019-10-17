import React from "react";
import axios from "axios";

const PokeApi = () => {
  const [isLoading, setIsLoading] = React.useState(false);

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
      setPokemonName(api_response.response);
      setPokemonNumber(addLeadingZeros(input));
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
      {/* {isLoading ? <div>Loading...</div> : getResponseJsx(response)} */}
      {isLoading ? <div>Loading...</div> : <div>Cannot get Pokemon</div>}
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
