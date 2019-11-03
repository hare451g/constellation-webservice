# Constellation webservice

### How to start ?

1. Install node js and yarn, please refer to [node js install guide ](https://nodejs.org/en/download/), and [yarn install guide](https://yarnpkg.com/lang/en/docs/install/)

2. clone this project:
   `git clone https://github.com/hare451g/constellation-webservice`

3. change directory to cloned project:
   `cd constellation-webservice`

4. Install dependencies
   `yarn install`

5. Create .env file

   ```
   ENVIRONTMENT=<name_of_stage>

   DATABASE_USERNAME=<database_username>
   DATABASE_PASSWORD=<database_password>
   DATABASE_NAME=<database_name>
   DATABASE_CLUSTER=<database_cluster>
   DATABASE_HOST=<databse_name>
   DATABASE_PORT=<database_port>

   SERVER_HOST=<server_hostname>
   SERVER_PORT=<server_port>

   JWT_SECRET=<super_secret_string>
   ```

6. run !
   `yarn start` or for dev `yarn run dev`

### Test the API

You can test the API with [insomnia](https://insomnia.rest/).

after install insomnia rest client, you should import `insomnia.json` to your insomnia in application toolbar and choose data tab and choose import data from file.

made with 💖 from constellation team !
