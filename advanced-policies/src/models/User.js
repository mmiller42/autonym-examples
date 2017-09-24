import { Model, createInMemoryStore } from 'autonym'
import { hashPassword, isAdmin, isSelf, preventAdminChange, removePasswordHash } from '../policies'

export default new Model({
  name: 'user',
  schema: {
    type: 'object',
    properties: {
      username: { type: 'string', minLength: 5, maxLength: 24 },
      password: { type: 'string', minLength: 8, maxLength: 24 },
      isAdmin: { type: 'boolean', default: false },
    },
    required: ['username', 'password'],
  },
  optionalUpdateProperties: ['password'],
  policies: {
    create: {
      // Users may only be created by administrators
      postSchema: { and: [isAdmin, hashPassword] },
      postStore: removePasswordHash,
    },
    find: {
      postStore: removePasswordHash,
    },
    findOne: {
      postStore: removePasswordHash,
    },
    findOneAndUpdate: {
      // A user may be edited by an administrator, or they may edit their own record (but they may not promote
      // themselves to admin)
      postSchema: { and: [{ or: [isAdmin, { and: [isSelf, preventAdminChange] }] }, hashPassword] },
      postStore: removePasswordHash,
    },
    // Users may only be deleted by administrators
    findOneAndDelete: {
      preStore: isAdmin,
    },
  },
  store: createInMemoryStore(),
})
