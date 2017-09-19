import { Model, createInMemoryStore } from 'autonym'

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
  // A simple store implementation that saves data in memory
  store: createInMemoryStore(),
})
