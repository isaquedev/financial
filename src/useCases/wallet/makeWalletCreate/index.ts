import { HttpResponse } from "@adapters/routeAdapter";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeWalletCreateDependecies {
  walletDAO: WalletDAO
}

interface PostWalletCreateBody {
  name: string
}

export default ({ walletDAO }: MakeWalletCreateDependecies) => {
  return async function postWalletCreate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { name } = httpRequest.body as PostWalletCreateBody;

      const walletCount = await walletDAO.countAll(userId);

      if (walletCount === 5) {
        return {
          statusCode: 400,
          body: {
            message: "You have reached the maximum number of wallets"
          }
        }
      }

      const wallet = await walletDAO.create({
        name,
        userId
      })
      
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