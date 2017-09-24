import { hash } from 'bcryptjs'

export default async function hashPassword(req) {
  const { password } = req.getData()

  if (password) {
    const passwordHash = await hash(password, 10)

    req.setData({ password: undefined, passwordHash })
  }
}
