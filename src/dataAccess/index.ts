import prisma from "../database";

import makeEntryDB from "./makeEntryDB";
import makeUserDB from "./makeUserDB";
import makeWalletDB from "./makeWalletDB";

const entryDB = makeEntryDB(prisma)
const userDB = makeUserDB(prisma)
const walletDB = makeWalletDB(prisma)

export {
  entryDB,
  userDB,
  walletDB
}
