# Todo Services

Implementation of Express Js and Mongoose to create CRUD RESTful API.

## Features
    - Add new Todo entity
    - Get one Todo entity
    - Update existing Todo entity via Id
    - Delete a Todo entity via Id

## Installations
- Make sure you have installed: 
    - Node Js 8+
    - NPM / Yarn
    - MongoDB

- Then clone to this repository:
``` git clone https://github.com/hare451g/express-crud-mongoose.git```

- then install the dependencies via yarn or npm
``` npm install ```
or
``` yarn ```

- and then run start script
``` npm start ```
or 
``` yarn start ```

- The service should start on port 3000 on your localhost, access it with insomnia or postman !

### Avaliable Endpoints

#### create new todo
- url 
    -   `localhost:3000/todo`
- method
    -   `POST`
- request body:
    ```
        {
            "todo": {
                "name": "Belajar React",
                "completed": true
            }
        }
    ```
- response: 
    ```
    {
        "_id": "5bb874c8cba15b458235ce76",
        "name": "Belajar React",
        "completed": true,
        "__v": 0
    },
    ```
#### fetch all todo
- url 
    -   `localhost:3000/todo`
- method
    -   `GET`
- response: 
    ```
    [
        {
            "_id": "5bb874c8cba15b458235ce76",
            "name": "lorem ipsum dolor sit amet",
            "completed": true,
            "__v": 0
        },
        {
            "_id": "5bb87511547be845cd07e859",
            "name": "Belajar node",
            "completed": false,
            "__v": 0
        },
        {
            "_id": "5bb8882c26fcf34b132d726e",
            "name": "Belajar React",
            "completed": false,
            "__v": 0
        }
    ]
    ```
#### fetch one todo
- url 
    -   `localhost:3000/todo/:id`
- method
    -   `GET`
- response: 
    ```
    {
        "_id": "5bb874c8cba15b458235ce76",
        "name": "lorem ipsum dolor sit amet",
        "completed": true,
        "__v": 0
    },
    ```

#### update selected todo
- url 
    -   `localhost:3000/todo/:id`
- method
    -   `PUT`
- request body:
    ```
        {
            "todo": {
                "name": "Belajar React",
                "completed": true
            }
        }
    ```
- response: 
    ```
    {
        "_id": "5bb874c8cba15b458235ce76",
        "name": "Belajar React",
        "completed": true,
        "__v": 0
    },
    ```

#### Delete one todo
- url
    -   `localhost:3000/todo/:id`
- method
    -   `DELETE`
- response: 
    ```
    {
        "_id": "5bb874c8cba15b458235ce76",
        "name": "lorem ipsum dolor sit amet",
        "completed": true,
        "__v": 0
    },
    ```
