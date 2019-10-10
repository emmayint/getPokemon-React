// this is the endpoint that calls the api `https://pokeapi.co/api/v2/pokemon/${num}`.
// This route will return the name and image of the pokemon
// accoring to the user imput in the query parameter "num"
// The name is returned as "res.data.forms[0].name"
// The image is returned from https://assets.pokemon.com/assets/cms2/img/pokedex/full/${001}.png
// ** only takes 3-digit **

import React from 'react';
import axios from 'axios';

const PokeApi = () => {

    const [ userInput, setUserInput ] = React.useState('25');
    const [ pokemonName, setPokemonName ] = React.useState('');
    const [ pokemonNumber, setPokemonNumber ] = React.useState('');

    const addLeadingZeros = (num) => {
        if(num < 10){
            let s = num + "";
            s = "00" + s;
            return s;
        }
        if(num/10 < 10){
            let s = num + "";
            s = "0" + s;
            return s;
        } else {
            return num;
        }
    }

    const handleSearch = () => {
        let input = parseInt(userInput);
        get_pokemon(input).then((api_response) => {
            setPokemonName(api_response.result.forms[0].name);
            setPokemonNumber(addLeadingZeros(api_response.result.id))
        })

        // let input = {userInput} ;
        // if (!isNaN(parseInt(input, 10)) && input <= 800 && input >=1){
        //     // make api call
        //     get_pokemon(input).then((api_response) => {
        //         alert(api_response);
        //     })
        // } else {
        //     // handle error
        // }
    }

    const get_pokemon = (num) => {
        return axios({
            // https://pokeapi.co/api/v2/pokemon/1/
            url: `https://pokeapi.co/api/v2/pokemon/${num}`,
            method: 'get',
            responseType: 'json'
        })
        .then((res) => {
            let status = 'OK';
            // let result = res
            let result = res.data || 'Error getting pokemon';
            return {
                status: status,
                result: result
            };
        })
        .catch((err) => {
            let status = 'ERROR';
            let result = err.message;
            return {
                status: status,
                result: result
            };
        });
    };
    
    // const pokeapi = async (req, res) => {
    //     let response;
    //     let params = req.query;
    //     if ( params.num ) {
    //         await get_pokemon(params.num)
    //         .then((api_response) => {
    //             response = generate_response(api_response.status, params, api_response.result);
    //         });
    //     } else {
    //         response = generate_response('ERROR', params, 'Query parameter \"num\" not given');
    //     }
    //     res.send(response);
    // }




    return(
        <div className="pokeapi-page">
            <h2>PokeApi Component</h2>
            <p>Input a number from 1 to 800 to look up a pokemon.</p>
            <p></p>
            <span>
                <input value={userInput}
                    onChange={ (e) => setUserInput(e.target.value)}
                />
            </span>
            <span>
                <button
                    onClick={() => handleSearch({userInput})}
                >
                    Search
                </button>
            </span>
            <div className="pokemonStats">
                <p>{pokemonName? `Name: ${pokemonName}`: ""}</p>
                <p>{pokemonNumber? `Pokedex #: ${pokemonNumber}`: ""}</p>
            </div>
            <div className="pokemonImage">
                {pokemonNumber? <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`} alt="pokemon"/>: ''}
            </div>
        </div>
    )
}

export default PokeApi