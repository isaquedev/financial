import { Entry, PrismaClient } from "@prisma/client"

interface EntryCreate extends Omit<Entry, "id"|"createdAt"|"updatedAt"> {}

interface EntryUpdate extends Omit<Entry, "id"|"createdAt"|"updatedAt"|"userId"> {}

interface EntryObject extends Omit<Entry, "value"> {
  value: number
}

export interface EntryDAO {
  findOne(id: string): Promise<EntryObject|null>
  findOneOfUser(id: string, userId: string): Promise<EntryObject|null>
  findAll(userId: string): Promise<EntryObject[]>
  findAllOfWallet(walletId: string): Promise<EntryObject[]>
  create(data: EntryCreate): Promise<EntryObject>
  update(id: string, data: EntryUpdate): Promise<EntryObject>
  remove(id: string): Promise<EntryObject>
}

export default (client: PrismaClient): EntryDAO => {

  function parseEntryOrNull(entry: Entry | null): EntryObject | null {
    if (!entry) return null
    return {
      ...entry,
      value: Number(entry.value)
    }
  }

  function parseEntry(entry: Entry): EntryObject {
    return {
      ...entry,
      value: Number(entry.value)
    }
  }

  async function findOne(id: string) {
    const entry =  await client.entry.findUnique({
      where: { id }
    })

    return parseEntryOrNull(entry)
  }

  async function findOneOfUser(id: string, userId: string) {
    const entry = await client.entry.findFirst({
      where: { 
        AND: [
          { id },
          { userId }
        ]
       }
    })

    return parseEntryOrNull(entry)
  }

  async function findAll(userId: string): Promise<EntryObject[]> {
    const entries = await client.entry.findMany({
      where: { userId }
    })

    return entries.map(parseEntry)
  }

  async function findAllOfWallet(walletId: string): Promise<EntryObject[]> {
    const entries = await client.entry.findMany({
      where: { walletId }
    })

    return entries.map(parseEntry)
  }

  async function create(data: EntryCreate) {
    const entry = await client.entry.create({
      data
    })

    return parseEntry(entry)
  }

  async function update(id: string, data: EntryUpdate) {
    const entry = await client.entry.update({
      where: { id },
      data
    })

    return parseEntry(entry)
  }

  async function remove(id: string) {
    const entry = await client.entry.delete({
      where: { id }
    })

    return parseEntry(entry)
  }

  return Object.freeze({
    findOne,
    findOneOfUser,
    findAll,
    findAllOfWallet,
    create,
    update,
    remove
  })
}
