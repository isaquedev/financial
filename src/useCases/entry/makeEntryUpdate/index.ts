import { HttpResponse } from "@adapters/routeAdapter";
import { EntryDAO } from "@dataAccess/makeEntryDAO";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeEntryUpdateDependecies {
  entryDAO: EntryDAO
  walletDAO: WalletDAO
}

interface PutEntryUpdateParams {
  id: string
}

interface PutEntryUpdateBody {
  name: string
  date: string
  done: boolean
  type: string
  walletId: string
  value: number
}

export default ({ entryDAO, walletDAO }: MakeEntryUpdateDependecies) => {
  return async function putEntryUpdate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { name, date, done, type, walletId, value } = httpRequest.body as PutEntryUpdateBody;
      const { id: entryId } = httpRequest.params as PutEntryUpdateParams;

      const wallet = await walletDAO.findOneOfUser(walletId, userId);

      if (!wallet || wallet.userId !== userId) {
        return {
          statusCode: 404,
          body: {
            message: "Wallet not found"
          }
        }
      }

      const entry = await entryDAO.findOneOfUser(entryId, userId);

      if (!entry) {
        return {
          statusCode: 404,
          body: {
            message: "Entry not found"
          }
        }
      }

      const updatedEntry = await entryDAO.update(entryId,
        { 
          name,
          done,
          type,
          walletId,
          date: new Date(date),
          value: BigInt(value)
        }
      )
      
      return {
        statusCode: 200,
        body: {
          data: updatedEntry
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