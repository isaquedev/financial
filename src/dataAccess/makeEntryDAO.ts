import { Entry, PrismaClient } from "@prisma/client"
import { Pagination } from "@utils/pagination"

interface EntryCreate extends Omit<Entry, "id"|"createdAt"|"updatedAt"> {}

interface EntryUpdate extends Omit<Entry, "id"|"createdAt"|"updatedAt"|"userId"> {}

interface EntryObject extends Omit<Entry, "value"> {
  value: number
}

export interface EntryDAO {
  findOne(id: string): Promise<EntryObject|null>
  findOneOfUser(id: string, userId: string): Promise<EntryObject|null>
  findAll(userId: string): Promise<EntryObject[]>
  findAllPaginated(userId: string, paginate: Pagination, date: string): Promise<EntryObject[]>
  findAllOfWallet(walletId: string): Promise<EntryObject[]>
  count: (userId: string) => Promise<number>
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

  async function findAllPaginated(userId: string, pagination: Pagination, date: string): Promise<EntryObject[]> {
    const _date = new Date(date)
    const nextDay = new Date(date)
    nextDay.setDate(nextDay.getDate() + 1)

    const entries = await client.entry.findMany({
      where: {
        AND: [
          { userId },
          { date: {
              gte: _date, 
              lt: nextDay
            }
          }
        ]
      },
      skip: pagination.page * pagination.perPage,
      take: pagination.perPage
    })

    return entries.map(parseEntry)
  }

  async function findAllOfWallet(walletId: string): Promise<EntryObject[]> {
    const entries = await client.entry.findMany({
      where: { walletId }
    })

    return entries.map(parseEntry)
  }

  async function count(userId: string): Promise<number> {
    return await client.entry.count({
      where: { userId }
    })
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
    findAllPaginated,
    findAllOfWallet,
    count,
    create,
    update,
    remove
  })
}
