import { Wallet, PrismaClient } from "@prisma/client"

export interface WalletDAO {
  findOne(id: string): Promise<Wallet|null>
  findAll(userId: string): Promise<Wallet[]>
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

  return Object.freeze({
    findOne,
    findAll
  })
}
