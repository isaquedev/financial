import { entryDAO, walletDAO } from "@dataAccess/index";

import makeEntryList from "./makeEntryList";
import makeEntryCreate from "./makeEntryCreate";
import makeEntryUpdate from "./makeEntryUpdate";
import makeEntryRemove from "./makeEntryRemove";

const getEntryList = makeEntryList({
  entryDAO
})

const postEntryCreate = makeEntryCreate({
  entryDAO,
  walletDAO
})

const putEntryUpdate = makeEntryUpdate({
  entryDAO,
  walletDAO
})

const deleteEntryRemove = makeEntryRemove({
  entryDAO
})

export {
  getEntryList,
  postEntryCreate,
  putEntryUpdate,
  deleteEntryRemove
}
