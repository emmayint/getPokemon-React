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

const get_image_classification = (url) => {
    return axios({
        url: `https://api.imagga.com/v2/tags?image_url=${url}`,
        method: 'get',
        auth: {
            username: process.env.IMG_API_KEY,
            password: process.env.IMG_API_SECRET
        },
        responseType: 'json'
    })
    .then((res) => {
        let status = 'OK';
        let result = res.data.result.tags.slice(0, 3) || 'Error recognizing image';
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

const image_recognition = async (req, res) => {
    let response;
    let params = req.query;
    if ( params.image_url ) {
        await get_image_classification(params.image_url)
        .then((api_response) => {
            response = generate_response(api_response.status, params, api_response.result);
        });
    } else {
        response = generate_response('ERROR', params, 'Query parameter \"image_url\" not given');
    }
    res.send(response);
}

module.exports = image_recognition;