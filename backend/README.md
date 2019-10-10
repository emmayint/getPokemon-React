# hw1

EC2 information:

Public DNS (IPv4): ec2-3-19-123-184.us-east-2.compute.amazonaws.com

IPv4 Public IP: 3.19.123.184

## Calling the API:

The API has two endpoints. To call the API, send a get request with the corresponding endpoint and input to ec2-3-19-123-184.us-east-2.compute.amazonaws.com/${desired_endpoint}?${query_parameter=input}

## List of Endpoints:

The image_recognition takes as query_input an image_url, which is the url of an image, and returns the top 3 classifications of that image.  
/image_recognition?image_url=url_of_image  
ie. /image_recognition?image_url=https://www.mammothoutlet.com/wp-content/uploads/2017/12/bed-size-chart.png

```javascript
{
    "status": "OK",
    "date": "2019-09-29T18:34:37.513Z",
    "params": {
        "image_url": "https://www.mammothoutlet.com/wp-content/uploads/2017/12/bed-size-chart.png"
    },
    "response": [
        {
            "confidence": 46.4153060913086,
            "tag": {
                "en": "silhouette"
            }
        },
        {
            "confidence": 37.0746154785156,
            "tag": {
                "en": "horse"
            }
        },
        {
            "confidence": 29.3308601379395,
            "tag": {
                "en": "black"
            }
        }
    ]
}
```

The "/pokeapi" endpoint takes a query parameter "num" as a pokeindex, and shows the json with corresponding pokemon name. For example "/pokeapi?num=1" shows in the browser

```javascript
{
    "status": "OK",
    "date": "2019-09-29T19:38:50.725Z",
    "params":{
        "num": "1"
    },
    "response": "bulbasaur"
}
```
