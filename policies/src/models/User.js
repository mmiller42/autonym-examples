import { Model, createInMemoryStore } from 'autonym'
import { addCreationTimestamp, hashPassword, removePasswordHash } from '../policies'

export default new Model({
  name: 'user',
  schema: {
    type: 'object',
    properties: {
      creationTimestamp: { type: 'number' },
      username: { type: 'string', minLength: 6, maxLength: 24 },
      password: { type: 'string', minLength: 8, maxLength: 24 },
    },
    required: ['creationTimestamp', 'username', 'password'],
  },

  // Normally, update request bodies are merged with the current record being updated before schema validation, so
  // usually this isn't needed. However, when saving a user, we delete the `password` property from the data and instead
  // store a `passwordHash`, so this means that even after merging, the request would fail schema validation! This
  // configuration allows us to remove the required constraint in the schema for `password`, only for update requests.
  optionalUpdateProperties: ['password'],

  policies: {
    create: {
      // Set the timestamp to the current time
      preSchema: addCreationTimestamp,

      // Hash the password before saving the data
      postSchema: hashPassword,

      // Remove the password hash from the response
      postStore: removePasswordHash,
    },
    find: {
      postStore: removePasswordHash,
    },
    findOne: {
      postStore: removePasswordHash,
    },
    findOneAndUpdate: {
      postSchema: hashPassword,
      postStore: removePasswordHash,
    },

    // No deleting allowed
    findOneAndDelete: false,
  },
  store: createInMemoryStore(),
})
