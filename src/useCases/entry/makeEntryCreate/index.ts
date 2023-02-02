import { HttpResponse } from "@adapters/routeAdapter";
import { EntryDAO } from "@dataAccess/makeEntryDAO";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeEntryCreateDependecies {
  entryDAO: EntryDAO
  walletDAO: WalletDAO
}

interface PostEntryCreateBody {
  name: string
  date: string
  done: boolean
  type: string
  walletId: string
  value: number
}

export default ({ entryDAO, walletDAO }: MakeEntryCreateDependecies) => {
  return async function postEntryCreate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { name, date, done, type, walletId, value } = httpRequest.body as PostEntryCreateBody;

      const wallet = await walletDAO.findOneOfUser(walletId, userId);

      if (!wallet || wallet.userId !== userId) {
        return {
          statusCode: 404,
          body: {
            message: "Wallet not found"
          }
        }
      }

      const entry = await entryDAO.create({
        name,
        done,
        type,
        walletId,
        userId,
        date: new Date(date),
        value: BigInt(value)
      })
      
      return {
        statusCode: 200,
        body: {
          data: entry
        }
      }
    } catch (error: any) {
      console.error(error);
      return {
        statusCode: 400,
        body: {
          error: error.message
        }
      }
    }
  }
}