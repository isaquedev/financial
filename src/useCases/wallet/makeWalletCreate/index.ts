import { HttpResponse } from "@adapters/routeAdapter";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";
import { WalletChangeValidation } from "@models/wallet";
import { Validator } from "@validations/validator";

interface MakeWalletCreateDependecies {
  walletDAO: WalletDAO
  validator: Validator,
  validationRules: WalletChangeValidation
}

interface PostWalletCreateBody {
  name: string
}

export default ({ walletDAO, validator, validationRules }: MakeWalletCreateDependecies) => {
  return async function postWalletCreate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { name } = httpRequest.body as PostWalletCreateBody;

      const errors = validator<PostWalletCreateBody>(httpRequest.body, validationRules)

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