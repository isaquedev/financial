import { Wallet, PrismaClient } from "@prisma/client"

interface WalletCreate extends Omit<Wallet, "id"|"createdAt"|"updatedAt"> {}

interface WalletUpdate extends Omit<Wallet, "createdAt"> {}

export interface WalletDAO {
  findOne(id: string): Promise<Wallet|null>
  findAll(userId: string): Promise<Wallet[]>
  create(data: WalletCreate): Promise<Wallet>
  update(id: string, data: WalletUpdate): Promise<Wallet|null>
}

export default (client: PrismaClient): WalletDAO => {
  async function findOne(id: string) {
    return await client.wallet.findUnique({
      where: { id }
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

  return Object.freeze({
    findOne,
    findAll,
    create,
    update
  })
}
