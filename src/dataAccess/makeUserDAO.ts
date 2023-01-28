import { PrismaClient, User } from "@prisma/client"

type UserCreate = {
  email: string;
  name: string;
  password: string;
}

export interface  UserDAO {
  findOne(id: string): Promise<User|null>
  findByEmail(email: string): Promise<User|null>
  create(data: UserCreate): Promise<User>
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

  async function create(data: UserCreate) {
    return await client.user.create({
      data
    })
  }

  return Object.freeze({
    findOne,
    findByEmail,
    create
  })
}
