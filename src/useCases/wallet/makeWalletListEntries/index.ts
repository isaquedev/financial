import { HttpResponse } from "@adapters/routeAdapter";
import { EntryDAO } from "@dataAccess/makeEntryDAO";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeWalletEntriesListDependecies {
  walletDAO: WalletDAO
  entryDAO: EntryDAO
}

interface MakeWalletEntriesListParams {
  walletId: string
}

export default ({ walletDAO, entryDAO }: MakeWalletEntriesListDependecies) => {
  return async function getWalletEntriesList(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { walletId } = httpRequest.params as MakeWalletEntriesListParams;

      const wallet = await walletDAO.findOneOfUser(walletId, userId)

      if (!wallet) {
        return {
          statusCode: 404,
          body: {
            error: "Wallet not found"
          }
        }
      }

      const entries = await entryDAO.findAllOfWallet(walletId)
      
      return {
        statusCode: 200,
        body: {
          data: entries
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