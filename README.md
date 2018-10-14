#TypeScript Express Mongoose Boilerplate

##Scripts

Start the server in development mode with auto refresh on change

    npm start
    
Run the unit tests with optional watch script

    npm test
    npm test:watch

Seed data for testing. This will create 10 users with the default password "Testing123!"

    npm run seed

##Environment Settings

There is a .env file in the root folder that contains all definitions.
Using the dotenv NPM package, it will load it into the process.env object.
<b>It is recommended that you add the .env to your gitignore when cloning this project as it will contain sensitive data.</b>

##Endpoints

###Login

[POST] http://localhost:3006/api/auth

Body: 
{
    "username": "User1",
    "password": "Testing123!"
}

Response:
{
    "token": "EncryptedJWTToken"
}

###Get Profile

[GET] http://localhost:3006/api/user/profile

Headers:
{
    "Authorization": "Bearer {{tokenReceivedFromAuthResponse}}"
}

#####Notes: 
There is a POSTMAN (2.1) collection included in the root directory: API-Boilerplate.postman_collection.json
