import { Model } from 'autonym'
import { createSqlStore } from '../stores'

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
  store: createSqlStore({
    table: 'people',
    searchableProperties: ['firstName', 'lastName'],
    sort: '+lastName',
    limit: 10,
  }),
})
