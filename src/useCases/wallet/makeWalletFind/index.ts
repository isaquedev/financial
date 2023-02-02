import { HttpResponse } from "@adapters/routeAdapter";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeWalletFindDependecies {
  walletDAO: WalletDAO
}

interface MakeWalletFindParams {
  walletId: string
}

export default ({ walletDAO }: MakeWalletFindDependecies) => {
  return async function getWalletList(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { walletId } = httpRequest.params as MakeWalletFindParams;

      const wallet = await walletDAO.findOneOfUser(walletId, userId)

      if (!wallet || wallet.userId !== userId) {
        return {
          statusCode: 404,
          body: {
            error: "Wallet not found"
          }
        }
      }
      
      return {
        statusCode: 200,
        body: {
          data: wallet
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