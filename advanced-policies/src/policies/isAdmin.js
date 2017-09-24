import { AutonymError } from 'autonym'
import { getCurrentUser } from '../services'

export default async function isAdmin(req, res, meta) {
  // A good use case for the meta object is caching operations that may be repeated in different policies. Here we fetch
  // the current user, unless a fetch was already started by another previous policy and saved in the meta object.
  if (!meta.currentUser) {
    meta.currentUser = getCurrentUser(req)
  }

  const currentUser = await meta.currentUser
  // Throw a forbidden error if the user is not an admin
  if (!currentUser.isAdmin) {
    throw new AutonymError(AutonymError.FORBIDDEN, 'You must be an administrator to perform this action.')
  }
}
