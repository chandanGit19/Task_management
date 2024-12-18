

# Backend API Documentation


# clone the git reposetry 

run command 

# npm install // npm i

## `/api/v1/signUp` Endpoint

### Description

Registers a new user by creating a user account with the provided information.

### HTTP Method

`POST`

### Request Body

The request body should be in JSON format and include the following fields:

- `userName` (object):
- `email` (string, required): User's email address .
- `password` (string, required): User's password .

### Example Response

- `user` (object):
  - `userName` (object).
  - `email` (string): User's email address .
  - `password` (string): User's password .
- `token` (String): JWT Token

## `/api/v1/login` Endpoint

### Description

Authenticates a user using their email and password, returning a JWT token upon successful login.

### HTTP Method

`POST`

### Endpoint

`/api/v1/login`

### Request Body

The request body should be in JSON format and include the following fields:

- `email` (string, required): User's email address.
- `password` (string, required): User's password .

### Example Response

- `user` (object):
  - `userName` (object).
  - `email` (string): User's email address .
  - `password` (string): User's password .
- `token` (String): JWT Token

## `/api/v1/taskCreate` Endpoint

### Description

Creating Task for the currently authenticated user.

### HTTP Method

`POST`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `user` (object):
  - `userName` (object).
    - `tasks` (string): Task array .
  - `email` (string): User's email address .



## `/api/v1/logout` Endpoint

### Description

Logout the current user and blacklist the token provided in cookie or headers



## `/api/v1/getTasks` Endpoint

### Description

fetching all task for the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `user` (object):
  - `userName` (object).
    - `tasks` (string): task array .
     -`tasks`:all the Task
  - `email` (string): User's email address .



  ## `/api/v1/task/:id` Endpoint

### Description

fetching single task for the currently authenticated user.

### HTTP Method

`GET`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

### Example Response

- `task` (object):


## `/api/v1/update/:id` Endpoint

### Description

Update a task single task for the currently authenticated user.

### HTTP Method

`PUT`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

The request body should be in JSON format and include the following fields:

- `title` (string, required): User's email address.
- `description` (string, required): User's password .

### Example Response

- `message` (string): updated





## `/api/v1/delete/:id` Endpoint

### Description

Update a task single task for the currently authenticated user.

### HTTP Method

`DELETE`

### Authentication

Requires a valid JWT token in the Authorization header:
`Authorization: Bearer <token>`

The request body should be in JSON format and include the following fields:

-`id`:Task id in params

### Example Response

- `message` (string): deleted successfuly
  




