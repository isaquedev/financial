import { HttpResponse } from "@adapters/routeAdapter";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeWalletListDependecies {
  walletDAO: WalletDAO
}

export default ({ walletDAO }: MakeWalletListDependecies) => {
  return async function getWalletList(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;

      const wallets = await walletDAO.findAll(userId);
      
      return {
        statusCode: 200,
        body: {
          data: wallets
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