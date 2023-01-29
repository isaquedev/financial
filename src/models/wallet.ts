import { Wallet } from "@prisma/client"
import { Validation } from "@validations/validator"

interface WalletChangeValidationFields extends Omit<Wallet, "id" | "userId" | "createdAt" | "updatedAt"> {}

export type WalletChangeValidation = Validation<WalletChangeValidationFields>

interface IWalletModel {
  changeValidation: WalletChangeValidation
}

export const walletValidations: IWalletModel = {
  changeValidation: {
    name: { name: "Nome", type: "string", required: true, min: 3, max: 255 },
  }
}
