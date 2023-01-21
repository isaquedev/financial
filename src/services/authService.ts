import jwt from 'jsonwebtoken';

interface DecodedToken {
  iat: number
  user_id: string
  email: string
}

export interface AuthService {
  login: (id: string, email: string) => Promise<string>
  me: (token: string) => Promise<string>
}

export default (): AuthService => {
  async function login (id: string, email: string) {
    return jwt.sign({ user_id: id, email }, process.env.JWT_SECRET)
  }

  async function me (token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken
    return decoded.user_id
  }

  return Object.freeze({
    login,
    me
  })
}
