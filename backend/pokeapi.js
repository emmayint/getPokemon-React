const axios = require('axios');

const generate_response = (status, params, message) => {
    let date = new Date();
    return {
        status: status,
        date: date,
        params: params,
        response: message
    };
};

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
        let result = res.data.forms[0].name || 'Error getting pokemon';
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

const pokeapi = async (req, res) => {
    let response;
    let params = req.query;
    if ( params.num ) {
        await get_pokemon(params.num)
        .then((api_response) => {
            response = generate_response(api_response.status, params, api_response.result);
        });
    } else {
        response = generate_response('ERROR', params, 'Query parameter \"num\" not given');
    }
    res.send(response);
}

module.exports = pokeapi;