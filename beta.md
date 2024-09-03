# Experimental Features

## *Home Assistant Camera Entities* ##

<code>tiles.json</code>

`{
    "name": "Driveway Camera",
    "link": "http://homeassistant.local:8123",
    "api": "homeassistant",
    "key": "API_KEY",
    "endpoint": "/api/camera_proxy/camera.driveway"
}`

- The Link attribute will be recognised as the API's URL.

## APIs ##

## *Snapmaker V2 API* ##

`{
    "api": "snapmaker",
    "link": "http://192.168.0.97:8080",
    "endpoint": "/api/v1/status"
}`
