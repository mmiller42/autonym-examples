# Advanced Policies Example

This is an example that demonstrates adding more complex policies to a model.

## Installation

Clone the repository to your machine and install the dependencies for this example.

```bash
git clone https://github.com/mmiller42/autonym-examples.git
cd autonym-examples/advanced-policies
npm install
```

## Running

The API runs on the port specified by the `PORT` environment variable, or defaults to `3000`.

Run the app in development mode. This will watch for changes and recompile.

```bash
npm run dev
```

Alternatively, you can build from the source and then start the app.

```bash
npm run build
npm start
```

### Example requests

#### Create a new user

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: 1' -X POST -d '{"username":"mmiller42","password":"12345678"}' http://localhost:3000/users
```

```json
{
  "id": "2",
  "username": "mmiller42",
  "isAdmin": false
}
```

#### Attempt to create without authorization

```bash
curl -H 'Content-Type: application/json' -X POST -d '{"username":"jgalt42","password":"12345678"}' http://localhost:3000/users
```

```json
{
  "message": "You are not logged in."
}
```

#### Attempt to create without being an admin

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: 2' -X POST -d '{"username":"jgalt42","password":"12345678"}' http://localhost:3000/users
```

```json
{
  "message": "You must be an administrator to perform this action."
}
```

#### Find users

```bash
curl http://localhost:3000/users
```

```json
[
  {
    "id": "1",
    "username": "admin",
    "isAdmin": true
  },
  {
    "id": "2",
    "username": "mmiller42",
    "isAdmin": false
  }
]
```

#### Find one user

```bash
curl http://localhost:3000/users/1
```
```json
{
  "id": "1",
  "username": "admin",
  "isAdmin": true
}
```

#### Update the current user

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: 2' -X PATCH -d '{"username":"jgalt42"}' http://localhost:3000/users/2
```

```json
{
  "id": "2",
  "username": "jgalt42",
  "isAdmin": false
}
```

#### Update any user as an admin

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: 1' -X PATCH -d '{"username":"mmiller42"}' http://localhost:3000/users/2
```

```json
{
  "id": "2",
  "username": "mmiller42",
  "isAdmin": false
}
```

#### Attempt to change current user to admin without being an admin

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: 2' -X PATCH -d '{"isAdmin":true}' http://localhost:3000/users/2
```

```json
{
  "id": "2",
  "username": "mmiller42",
  "isAdmin": false
}
```

#### Attempt to update another user without being an admin

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: 2' -X PATCH -d '{"password":"87654321"}' http://localhost:3000/users/1
```

```json
{
  "message": "You may only edit your own user record."
}
```

#### Attempt to delete a user without being an admin

```bash
curl -H 'Authorization: 2' -X DELETE http://localhost:3000/users/1
```

```json
{ "message": "You must be an administrator to perform this action." }
```

#### Update a user as an admin to be another admin

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: 1' -X PATCH -d '{"isAdmin":true}' http://localhost:3000/users/2
```

```json
{
  "id": "2",
  "username": "mmiller42",
  "isAdmin": true
}
```

#### Delete a user as an admin

```bash
curl -H 'Content-Type: application/json' -H 'Authorization: 2' -X DELETE http://localhost:3000/users/1
```

```json
{
  "id": "1"
}
```
