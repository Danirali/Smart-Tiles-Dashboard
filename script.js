fetch('./tiles.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(tileData => { 
            if (tileData.api) {
                if (tileData.api === 'snapmaker') {
                    apiURL = tileData.link;
                    apiEndpoint = tileData.endpoint;

                    function requestAPI(token) {
                        apiEndpoint = '/api/v1/status'
                        fetch(apiURL + apiEndpoint, {
                            headers: {
                                "content-type": "application/json"
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                const tile = document.createElement('a');
                                tile.innerText = data['status'];
                                document.getElementById('container').appendChild(tile);
                            })
                    }
                    if (!tileData.key) {
                        apiEndpoint = '/api/v1/connect'
                        console.log('No API Key for Snapmaker -- getting key...')
                        apiKey = ""

                        fetch(apiURL + apiEndpoint, {
                            headers: {
                                "content-type": "application/json"
                            }
                        })
                            .then(response => response.json())
                            .then(data => {
                                apiKey = data['token']
                                console.log('Generated new api key:', apiKey)
                                requestAPI(apiKey);
                            })
                            .catch(error => console.error(error));
                    }

                        
                } else {
                    apiPlatform = tileData.api;
                    apiKey = tileData.key;
                    apiEndpoint = tileData.endpoint;
                    apiURL = tileData.link;

                    fetch(apiURL + apiEndpoint, {
                        headers: {
                            Authorization: `Bearer ${apiKey}`
                        }
                    })
                        .then(response => response.blob())
                        .then(blob => {
                            const image = URL.createObjectURL(blob);

                            const tile = document.createElement('a');
                            tile.innerText = tileData.name;
                            tile.href = tileData.link;
                            tile.style = tileData.style + "background-image: url('" + image + "')";
                            tile.className = "tile"
                            document.getElementById('container').appendChild(tile);
                        })
                        .catch(error => console.error(error));
                }

            } else {
                const tile = document.createElement('a');
                tile.innerText = tileData.name;
                tile.href = tileData.link;
                tile.style = tileData.style;
                tile.className = "tile"
                document.getElementById('container').appendChild(tile);
            }
        });
    });