import { PrismaClient, User } from "@prisma/client"

export interface  UserDAO {
  findOne(id: string): Promise<User|null>
  findByEmail(email: string): Promise<User|null>
}

export default (client: PrismaClient): UserDAO => {
  async function findOne(id: string) {
    return await client.user.findUnique({
      where: { id }
    })
  }

  async function findByEmail(email: string) {
    return await client.user.findUnique({
      where: { email }
    })
  }

  return Object.freeze({
    findOne,
    findByEmail
  })
}
