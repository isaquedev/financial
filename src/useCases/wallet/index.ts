import { walletDAO } from "@dataAccess/index";

import makeWalletList from "./makeWalletList";
import makeWalletCreate from "./makeWalletCreate";
import validator from "@validations/validator";

const getWalletList = makeWalletList({
  walletDAO
})

const postWalletCreate = makeWalletCreate({
  walletDAO,
  validator: validator
})

export {
  getWalletList,
  postWalletCreate
}
