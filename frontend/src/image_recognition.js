import React from 'react';
import axios from 'axios';

const PORT = process.env.PORT_NUMBER || 80;

const PokeApi = () => {

    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ userInput, setUserInput ] = React.useState('');
    const [ response, setResponse ] = React.useState({});

    const handleRecognize = (input) => {
        setIsLoading(true);
        axios({
            url: `https://localhost:${PORT}/image_recognition?image_url=${input}`,
            method: 'get',
            responseType: 'json'
        }).then((res) => {
            if ( res.status === "OK" ) {
                setResponse({
                    message: "Response successful.",
                    body: res.response
                });
            } else {
                setResponse({
                    message: "There is something wrong with the request."
                });
            }
        }).catch((res) => {
            setResponse({
                message: "There is something wrong with the connection."
            });
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const getResponseJsx = (res) => {
        if ( res.body ) {
            
        }
        // else is an error with a message.
        return (<div>
            {res.message}
        </div>);
    };


    return(
        <div className="ir-page">
            <h2>Image Recognition</h2>
            <p>Input the url of an image to recognize.</p>
            <p></p>
            <span>
                <input value={userInput}
                    onChange={ (e) => setUserInput(e.target.value)}
                />
            </span>
            <span>
                <button
                    onClick={() => handleRecognize({userInput})}
                >
                    Search
                </button>
            </span>
            {
                isLoading ? <div>Loading...</div> : 
                (getResponseJsx(response))
            }
        </div>
    )
}

export default PokeApi