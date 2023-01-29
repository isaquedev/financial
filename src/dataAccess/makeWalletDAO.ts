import { Wallet, PrismaClient } from "@prisma/client"

interface WalletCreate extends Omit<Wallet, "id"|"createdAt"|"updatedAt"> {}

interface WalletUpdate extends Omit<Wallet, "id"|"createdAt"|"updatedAt"|"userId"> {}

export interface WalletDAO {
  findOne(id: string): Promise<Wallet|null>
  findOneOfUser(id: string, userId: string): Promise<Wallet|null>
  findAll(userId: string): Promise<Wallet[]>
  create(data: WalletCreate): Promise<Wallet>
  update(id: string, data: WalletUpdate): Promise<Wallet|null>
  remove(id: string): Promise<Wallet|null>
}

export default (client: PrismaClient): WalletDAO => {
  async function findOne(id: string) {
    return await client.wallet.findUnique({
      where: { id }
    })
  }

  async function findOneOfUser(id: string, userId: string) {
    return await client.wallet.findFirst({
      where: { 
        AND: [
          { id },
          { userId }
        ]
       }
    })
  }

  async function findAll(userId: string) {
    return await client.wallet.findMany({
      where: { userId }
    })
  }

  async function create(data: WalletCreate) {
    return await client.wallet.create({
      data
    })
  }

  async function update(id: string, data: WalletUpdate) {
    return await client.wallet.update({
      where: { id },
      data
    })
  }

  async function remove(id: string) {
    return await client.wallet.delete({
      where: { id }
    })
  }

  return Object.freeze({
    findOne,
    findOneOfUser,
    findAll,
    create,
    update,
    remove
  })
}
