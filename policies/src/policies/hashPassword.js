import { hash } from 'bcryptjs'

export default async function hashPassword(req) {
  const { password } = req.getData()

  // This policy is also run for update requests, which might not update the password. So here we check if it exists.
  if (password) {
    const passwordHash = await hash(password, 10)

    req.setData({ password: undefined, passwordHash })
  }
}
