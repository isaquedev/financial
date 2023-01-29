import { HttpResponse } from "@adapters/routeAdapter";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";
import { Validator } from "@validations/validator";

interface MakeLoginDependencies {
  walletDAO: WalletDAO
  validator: Validator
}

interface PostWalletCreateBody {
  name: string
}

export default ({ walletDAO, validator }: MakeLoginDependencies) => {
  return async function postWalletCreate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { name } = httpRequest.body as PostWalletCreateBody;

      const errors = validator<PostWalletCreateBody>(httpRequest.body, {
        name: { name: "Nome", type: "string", required: true, min: 3, max: 255 },
      })

      if (errors) {
        return {
          statusCode: 400,
          body: {
            message: "Invalid request body",
            error: errors
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