import { deleteWalletRemove, getWalletList, postWalletCreate, putWalletUpdate } from "@useCases/wallet";
import { HttpRequest } from "../adapters/routeAdapter";

export default Object.freeze({
  getAll: (request: HttpRequest) => getWalletList(request),
  create: (request: HttpRequest) => postWalletCreate(request),
  update: (request: HttpRequest) => putWalletUpdate(request),
  remove: (request: HttpRequest) => deleteWalletRemove(request),
})