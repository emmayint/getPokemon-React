# hw1
EC2 Link: ec2-18-217-183-184.us-east-2.compute.amazonaws.com

## Calling the API:  

The API has two endpoints. To call the API, send a get request with the corresponding endpoint and input to ec2-18-217-183-184.us-east-2.compute.amazonaws.com:80/${desired_endpoint}?${query_parameter=input}  

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

