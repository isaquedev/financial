import { HttpResponse } from "@adapters/routeAdapter";
import { WalletDAO } from "@dataAccess/makeWalletDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";
import { Validator } from "@validations/validator";

interface MakeWalletUpdateDependecies {
  walletDAO: WalletDAO
  validator: Validator
}

interface PutWalletUpdateParams {
  id: string
}

interface PutWalletUpdateBody {
  name: string
}

export default ({ walletDAO, validator }: MakeWalletUpdateDependecies) => {
  return async function putWalletUpdate(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;
      const { name } = httpRequest.body as PutWalletUpdateBody;
      const { id: walletId } = httpRequest.params as PutWalletUpdateParams;

      const errors = validator<PutWalletUpdateBody>(httpRequest.body, {
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

      const wallet = await walletDAO.findOne(walletId);

      if (!wallet || wallet.userId !== userId) {
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