import { HttpResponse } from "@adapters/routeAdapter";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeWalletUpdateDependecies {
  walletDAO: WalletDAO
}

interface PutWalletUpdateParams {
  id: string
}

interface PutWalletUpdateBody {
  name: string
}

export default ({ walletDAO }: MakeWalletUpdateDependecies) => {
  return async function putWalletUpdate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { name } = httpRequest.body as PutWalletUpdateBody;
      const { id: walletId } = httpRequest.params as PutWalletUpdateParams;

      const wallet = await walletDAO.findOneOfUser(walletId, userId);

      if (!wallet) {
        return {
          statusCode: 404,
          body: {
            message: "Wallet not found"
          }
        }
      }

      const updatedWallet = await walletDAO.update(walletId, { name })
      
      return {
        statusCode: 200,
        body: {
          data: updatedWallet
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