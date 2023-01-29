import { HttpResponse } from "@adapters/routeAdapter";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";
import { WalletChangeValidation } from "@models/wallet";
import { Validator } from "@validations/validator";

interface MakeWalletUpdateDependecies {
  walletDAO: WalletDAO
  validator: Validator
  validationRules: WalletChangeValidation
}

interface PutWalletUpdateParams {
  id: string
}

interface PutWalletUpdateBody {
  name: string
}

export default ({ walletDAO, validator, validationRules }: MakeWalletUpdateDependecies) => {
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

      const errors = validator<PutWalletUpdateBody>(httpRequest.body, validationRules)

      if (errors) {
        return {
          statusCode: 400,
          body: {
            message: "Invalid request body",
            error: errors
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