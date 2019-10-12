import React from 'react';
import axios from 'axios';

const ImageRecognition = () => {

    const [ isLoading, setIsLoading ] = React.useState(false);
    const [ userInput, setUserInput ] = React.useState('https://www.mammothoutlet.com/wp-content/uploads/2017/12/bed-size-chart.png');
    const [ response, setResponse ] = React.useState({});

    const PORT = 4000;

    const handleRecognize = (input) => {
        setIsLoading(true);
        axios({
            url: `http://localhost:${PORT}/image_recognition?image_url=${input.userInput}`,
            method: 'get',
            responseType: 'json'
        }).then((res) => {
            if ( res.data.status === "OK" ) {
                setResponse({
                    message: "Response successful.",
                    body: res.data
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
            return (
                <div>
                    {res.body.response.map((category, i) => (
                        <div key={i}>
                            <strong>{category.tag.en}</strong>:
                            <p>{category.confidence}</p>
                        </div>
                    ))}
                </div>
            );
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

export default ImageRecognition