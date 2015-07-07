# Flat-Theme
   
A google maps test with angular and typescript.
   
   
## Running the demo
   
Create a new config.js file in the dist folder.   
Add the following code (change it with your own values).   

```javascript
var pinIt;
(function (pinIt) {
    'use strict';
    pinIt.config = {
        google: {
            apiKey: 'your key'
        },
        auth: {
            google: {
                clientId: 'your client id'
            }
        }
    }
})(pinIt || (pinIt = {}));
```
   
Create a new serverConfig.js file in the root folder.   
Add the following code (change it with your own values).   

```javascript
module.exports = {
    auth: {
        google: {
            clientSecret: 'your client secret'
        },
        jwt: {
            secret: 'your secret'
        }
    }
}
```
   
   
   
## MIT License
   
Copyright (c) 2015 Kevin Cornelis
