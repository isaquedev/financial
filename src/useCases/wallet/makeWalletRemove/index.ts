import { HttpResponse } from "@adapters/routeAdapter";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeWalletRemoveDependecies {
  walletDAO: WalletDAO
}

interface DeleteWalletRemoveParams {
  id: string
}

export default ({ walletDAO }: MakeWalletRemoveDependecies) => {
  return async function deleteWalletRemove(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { id: walletId } = httpRequest.params as DeleteWalletRemoveParams;

      const wallet = await walletDAO.findOneOfUser(walletId, userId);

      if (!wallet) {
        return {
          statusCode: 404,
          body: {
            message: "Wallet not found"
          }
        }
      }

      const walletCount = await walletDAO.countAll(userId);

      if (walletCount === 1) {
        return {
          statusCode: 400,
          body: {
            message: "You can't delete the last wallet"
          }
        }
      }

      await walletDAO.remove(walletId)
      
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