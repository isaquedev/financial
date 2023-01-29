import { walletDAO } from "@dataAccess/index";
import validator from "@validations/validator";

import makeWalletList from "./makeWalletList";
import makeWalletCreate from "./makeWalletCreate";
import makeWalletUpdate from "./makeWalletUpdate";
import makeWalletRemove from "./makeWalletRemove";
import { walletValidations } from "@models/wallet";

const getWalletList = makeWalletList({
  walletDAO
})

const postWalletCreate = makeWalletCreate({
  walletDAO,
  validator: validator,
  validationRules: walletValidations.changeValidation
})

const putWalletUpdate = makeWalletUpdate({
  walletDAO,
  validator: validator,
  validationRules: walletValidations.changeValidation
})

const deleteWalletRemove = makeWalletRemove({
  walletDAO
})

export {
  getWalletList,
  postWalletCreate,
  putWalletUpdate,
  deleteWalletRemove
}
