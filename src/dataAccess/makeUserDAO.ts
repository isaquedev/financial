import { PrismaClient, User } from "@prisma/client"

interface UserModel extends Omit<User, "password"> {
  password?: string;
}

type UserCreate = {
  email: string;
  name: string;
  password: string;
}

export interface  UserDAO {
  findOne(id: number): Promise<UserModel|null>
  findByEmail(email: string): Promise<UserModel|null>
  create(data: UserCreate): Promise<UserModel>
}

function exclude<User, Key extends keyof User>(
  user: User | null,
  keys: Key[]
): Omit<User, Key> | null {
  if (!user) {
    return user
  }
  for (let key of keys) {
    delete user[key]
  }
  return user
}

export default (client: PrismaClient): UserDAO => {
  async function findOne(id: number) {
    const user = await client.user.findUnique({
      where: { id }
    })

    return exclude(user, ["password"])
  }

  async function findByEmail(email: string) {
    const user = await client.user.findUnique({
      where: { email }
    })

    return exclude(user, ["password"])
  }

  async function create(data: UserCreate) {
    const user = await client.user.create({
      data
    })

    return exclude(user, ["password"])!
  }

  return Object.freeze({
    findOne,
    findByEmail,
    create
  })
}
