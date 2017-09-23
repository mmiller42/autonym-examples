# Policies Example

This is an example that demonstrates adding policies to a model.

## Installation

Clone the repository to your machine and install the dependencies for this example.

```bash
git clone https://github.com/mmiller42/autonym-examples.git
cd autonym-examples/basic
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
curl -H 'Content-Type: application/json' -X POST -d '{"username":"mmiller42","password":"12345678"}' http://localhost:3000/users
```

```json
{
  "id": "1",
  "username": "mmiller42"
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
    "username": "mmiller42"
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
  "username": "mmiller42"
}
```

#### Update username without affecting password

```bash
curl -H 'Content-Type: application/json' -X PATCH -d '{"username":"jgalt42"}' http://localhost:3000/people/1
```

```json
{
  "id": "1",
  "username": "jgalt42"
}
```

#### Update password

```bash
curl -H 'Content-Type: application/json' -X PATCH -d '{"password":"87654321"}' http://localhost:3000/people/1
```

```json
{
  "id": "1",
  "username": "jgalt42"
}
```

#### Delete a person

```bash
curl -X DELETE http://localhost:3000/people/1
```

```json
{ "id": "1" }
```
