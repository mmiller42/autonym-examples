# autonym-examples

[![Greenkeeper badge](https://badges.greenkeeper.io/mmiller42/autonym-examples.svg)](https://greenkeeper.io/)

Example apps using the [Autonym framework](https://github.com/mmiller42/autonym).

## Examples

### [basic](basic/)

A rudimentary example of creating an Autonym app with a model and then demonstrating the create, find, find one, find one and update, and find one and delete methods using their REST endpoints.

### [policies](policies/)

An introduction to using policies. Demonstrates how policies can be applied to various stages of each of the CRUD actions to manipulate the request and response, both synchronously and asynchronously.

### [advanced-policies](advanced-policies/)

A more complex example demonstrating how you can programmatically access model instances in policies, as well as cache the results of expensive functions via the meta object, to share data among policies. Also demonstrates the power of combining multiple policies into expressions in the model configuration.

### [sql-store](sql-store/)

The basic example adapted to use a SQL database. This example uses Postgres, but the Autonym implementation is powered by [Knex](http://knexjs.org/) and [Bookshelf](http://bookshelfjs.org/), so it also supports other SQL dialects.

### [custom-store](custom-store/)

A modification of the basic example that demonstrates how to create a custom store for a model using SQLite.
