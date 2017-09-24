import { Model } from 'autonym'
import { createSqliteStore } from '../stores'

// In this simplistic demo, a store is created by giving it a table name and a query to run to create the table.
const store = createSqliteStore(
  'people',
  'CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT)'
)

export default new Model({
  name: 'person',
  schema: {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
    },
    required: ['firstName', 'lastName'],
  },
  // The store needs to connect to the database, so we can use the init function exported by it to tell Autonym when
  // this model will be ready for action
  init: store.init,

  // The store has the CRUD methods on the returned object, so we can just pass it into the config
  store,
})
