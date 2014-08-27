// Create Restful Client
var Client = require('node-rest-client').Client;


// Step one
// GET https://login.uber.com/oauth/authorize

//
GET https://your-redirect-uri/?code=AUTHORIZATION_CODE


// 
curl -F 'client_secret=YOUR_CLIENT_SECRET' \
    -F 'client_id=YOUR_CLIENT_ID' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=YOUR_REDIRECT_URI' \
    -F 'code=AUTHORIZATION_CODE' \
    https://login.uber.com/oauth/token

    // Todo