import prisma from "../database";

import makeEntryDAO from "./makeEntryDAO";
import makeUserDAO from "./makeUserDAO";
import makeWalletDAO from "./makeWalletDAO";

const entryDAO = makeEntryDAO(prisma)
const userDAO = makeUserDAO(prisma)
const walletDAO = makeWalletDAO(prisma)

export {
  entryDAO,
  userDAO,
  walletDAO
}
