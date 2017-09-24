import { AutonymError } from 'autonym'
import { User } from '../models'

// A fake form of authentication (the current user ID is just in a header). You might choose to use a strategy here like
// parsing a JWT token or a session ID in a cookie.
export default async function getCurrentUser(req) {
  const authHeader = req.getHeader('Authorization')

  if (!authHeader) {
    throw new AutonymError(AutonymError.UNAUTHORIZED, 'You are not logged in.')
  }

  const userId = authHeader.trim()

  // Fetch the user with the given user ID. If the ID does not exist, a not found error would be confusing, so let's
  // catch such an error and instead return an unauthorized error in that case.
  try {
    return await User.findOne(userId)
  } catch (err) {
    if (err.isAutonymError && err.getCode() === AutonymError.NOT_FOUND) {
      throw new AutonymError(AutonymError.UNAUTHORIZED, 'Invalid user ID in Authorization header.')
    } else {
      throw err
    }
  }
}
