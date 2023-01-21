import { Wallet, PrismaClient } from "@prisma/client"

export interface WalletDAO {
  findOne(id: string): Promise<Wallet|null>
}

export default (client: PrismaClient) => {
  async function findOne(id: string) {
    return await client.wallet.findUnique({
      where: { id }
    })
  }

  return Object.freeze({
    findOne
  })
}
