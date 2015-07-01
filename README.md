# Flat-Theme
   
A google maps test with angular and typescript.
   
   
## Running the demo
   
Create a new config.js file in the dist folder.   
Add the following code (change the api key with your own key).   

```javascript
var pinIt;
(function (pinIt) {
	'use strict';
	pinIt.config = {
		google: {
			apiKey: 'your key'
		}
	}
})(pinIt || (pinIt = {}));
```
   
   
   
## MIT License
   
Copyright (c) 2015 Kevin Cornelis
