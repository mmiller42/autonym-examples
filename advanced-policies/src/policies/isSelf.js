import { AutonymError } from 'autonym'
import { getCurrentUser } from '../services'

export default async function isSelf(req, res, meta) {
  // This policy might have been called after isAdmin; if so, we can get the current user out of the meta cache.
  if (!meta.currentUser) {
    meta.currentUser = getCurrentUser(req)
  }

  const currentUser = await meta.currentUser
  // Throw a forbidden error if the user is not editing their own record
  if (currentUser.id !== req.getId()) {
    throw new AutonymError(AutonymError.FORBIDDEN, 'You may only edit your own user record.')
  }
}
