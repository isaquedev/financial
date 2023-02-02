import { entryDAO, walletDAO } from "@dataAccess/index";

import makeWalletList from "./makeWalletList";
import makeWalletEntriesList from "./makeWalletListEntries";
import makeWalletCreate from "./makeWalletCreate";
import makeWalletUpdate from "./makeWalletUpdate";
import makeWalletRemove from "./makeWalletRemove";

const getWalletList = makeWalletList({
  walletDAO
})

const getWalletEntriesList = makeWalletEntriesList({
  walletDAO,
  entryDAO
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
  getWalletEntriesList,
  postWalletCreate,
  putWalletUpdate,
  deleteWalletRemove
}
