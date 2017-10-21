# Basic Example

This is an example that uses [`autonym-sql-store`](https://github.com/mmiller42/autonym-sql-store) to save data inside a Postgres database.

## Installation

You must have PostgreSQL installed and configured on your machine with a user account.

Clone the repository to your machine and install the dependencies for this example.

```bash
git clone https://github.com/mmiller42/autonym-examples.git
cd autonym-examples/sql-store
npm install
```

Then, create a new database for this example project and set up the schema and tables.

```bash
createdb example
cat schema.sql | psql example
```

## Running

You will need to define an environment variable with a Postgres connection URL so that the app knows how to authenticate with your local database.

Export an environment variable for the current terminal session, or use a tool like dotenv to persist your environment config.

```bash
export DATABASE_URL="postgres://root@localhost:5432/example"
```

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

#### Create a new person

```bash
curl -H 'Content-Type: application/json' -X POST -d '{"firstName":"Matt","lastName":"Miller"}' http://localhost:3000/people
```

```json
{
  "id": "e343562e-6977-47c0-8077-d40451c39b1d",
  "firstName": "Matt",
  "lastName": "Miller"
}
```

#### Schema validation error

```bash
curl -H 'Content-Type: application/json' -X POST -d '{"firstName":"Matt"}' http://localhost:3000/people
```

```json
{
  "message": "Schema validation for model \"person\" failed.",
  "errors": [
    {
      "keyword": "required",
      "dataPath": "",
      "schemaPath": "#/required",
      "params": { "missingProperty": "lastName" },
      "message": "should have required property 'lastName'"
    }
  ]
}
```

#### Find people

```bash
curl http://localhost:3000/people
```

```json
[
  {
    "id": "e343562e-6977-47c0-8077-d40451c39b1d",
    "firstName": "Matt",
    "lastName": "Miller"
  }
]
```

#### Find one person

```bash
curl http://localhost:3000/people/e343562e-6977-47c0-8077-d40451c39b1d
```
```json
{
  "id": "e343562e-6977-47c0-8077-d40451c39b1d",
  "firstName": "Matt",
  "lastName": "Miller"
}
```

#### Update a property on a person

```bash
curl -H 'Content-Type: application/json' -X PATCH -d '{"firstName":"Matthew"}' http://localhost:3000/people/e343562e-6977-47c0-8077-d40451c39b1d
```

```json
{
  "id": "e343562e-6977-47c0-8077-d40451c39b1d",
  "firstName": "Matthew",
  "lastName": "Miller"
}
```

#### Delete a person

```bash
curl -X DELETE http://localhost:3000/people/e343562e-6977-47c0-8077-d40451c39b1d
```

```json
{
  "id": "e343562e-6977-47c0-8077-d40451c39b1d"
}
```

#### Not found error

```bash
curl http://localhost:3000/people/e343562e-6977-47c0-8077-d40451c39b1d
```

```json
{
  "message": "Record not found"
}
```
