# nodejs_backend

This is a Node.js REST API following the tutorial from Julia Strichash https://dev.to/juliest88/how-to-build-rest-api-with-nodejs-express-and-mysql-31jk

It works only with one table: the user table and contains also authorization.

| Methods | Urls                        | Actions                       |
| ------- | --------------------------- | ----------------------------- |
| Get     | /api/v1/users               | Get all users                 |
| ---     | ---                         | ---                           |
| Get     | /api/v1/users/id/1          | Get user with id=1            |
| ---     | ---                         | ---                           |
| Get     | /api/v1/users/username/anna | Get user with username='anna' |
| ---     | ---                         | ---                           |
| Get     | /api/v1/users/whoami        | Get the current user details  |
| ---     | ---                         | ---                           |
| Post    | /api/v1/users               | Create new user               |
| ---     | ---                         | ---                           |
| Patch   | /api/v1/users/users/id/1    | Update user with id=1         |
| ---     | ---                         | ---                           |
| Delete  | /api/v1/users/id/1          | Delete user with id=1         |
| ---     | ---                         | ---                           |
| Post    | /api/v1/users/login         | Login with email and password |
