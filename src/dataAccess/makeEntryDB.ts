import { Entry, PrismaClient } from "@prisma/client"

export interface EntryDAO {
  findOne(id: string): Promise<Entry|null>
}

export default (client: PrismaClient) => {
  async function findOne(id: string) {
    return await client.entry.findUnique({
      where: { id }
    })
  }

  return Object.freeze({
    findOne
  })
}
