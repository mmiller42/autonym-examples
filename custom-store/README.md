# Custom Store Example

This example demonstrates creating a custom store for use in a model. It uses SQLite.

## Installation

Clone the repository to your machine and install the dependencies for this example.

```bash
git clone https://github.com/mmiller42/autonym-examples.git
cd autonym-examples/custom-store
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

#### Create a new person

```bash
curl -H 'Content-Type: application/json' -X POST -d '{"firstName":"Matt","lastName":"Miller"}' http://localhost:3000/people
```

```json
{
  "id": "1",
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
    "id": "1",
    "firstName": "Matt",
    "lastName": "Miller"
  }
]
```

#### Find one person

```bash
curl http://localhost:3000/people/1
```
```json
{
  "id": "1",
  "firstName": "Matt",
  "lastName": "Miller"
}
```

#### Update a property on a person

```bash
curl -H 'Content-Type: application/json' -X PATCH -d '{"firstName":"Matthew"}' http://localhost:3000/people/1
```

```json
{
  "id": "1",
  "firstName": "Matthew",
  "lastName": "Miller"
}
```

#### Delete a person

```bash
curl -X DELETE http://localhost:3000/people/1
```

```json
{
  "id": "1"
}
```

#### Not found error

```bash
curl http://localhost:3000/people/1
```

```json
{
  "message": "Record not found"
}
```
