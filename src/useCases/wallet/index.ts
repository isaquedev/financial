import { walletDAO } from "@dataAccess/index";
import validator from "@validations/validator";

import makeWalletList from "./makeWalletList";
import makeWalletCreate from "./makeWalletCreate";
import makeWalletUpdate from "./makeWalletUpdate";
import makeWalletRemove from "./makeWalletRemove";

const getWalletList = makeWalletList({
  walletDAO
})

const postWalletCreate = makeWalletCreate({
  walletDAO,
  validator: validator
})

const putWalletUpdate = makeWalletUpdate({
  walletDAO,
  validator: validator
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
