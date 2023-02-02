import { walletDAO } from "@dataAccess/index";

import makeWalletList from "./makeWalletList";
import makeWalletCreate from "./makeWalletCreate";
import makeWalletUpdate from "./makeWalletUpdate";
import makeWalletRemove from "./makeWalletRemove";

const getWalletList = makeWalletList({
  walletDAO
})

const postWalletCreate = makeWalletCreate({
  walletDAO
})

const putWalletUpdate = makeWalletUpdate({
  walletDAO
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
