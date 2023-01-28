import { EncryptService } from '@services/encryptService';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  iat: number
  userId: number
}

export interface AuthService {
  login: (id: number, email: string) => Promise<string>
  hashPassword: (password: string) => Promise<string>
  comparePasswords: (password: string, hashedPassword: string) => Promise<boolean>
  verifyToken: (token: string) => Promise<number>
}

interface AuthServiceDependencies {
  encryptService: EncryptService
}

export default ({ encryptService }: AuthServiceDependencies): AuthService => {
  async function login (id: number, email: string) {
    return jwt.sign({ userId: id, email }, process.env.JWT_SECRET)
  }

  async function verifyToken (token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken
    return decoded.userId
  }

  async function hashPassword (password: string) {
    return encryptService.hash(password)
  }

  async function comparePasswords (password: string, hashedPassword: string) {
    return encryptService.compare(password, hashedPassword)
  }

  return Object.freeze({
    login,
    verifyToken,
    hashPassword,
    comparePasswords
  })
}
