import { walletDAO } from "@dataAccess/index";

import makeWalletList from "./makeWalletList";

const getWalletList = makeWalletList({
  walletDAO
})

export {
  getWalletList
}
