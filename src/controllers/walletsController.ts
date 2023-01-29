import { getWalletList, postWalletCreate } from "@useCases/wallet";
import { HttpRequest } from "../adapters/routeAdapter";

export default Object.freeze({
  getAll: (request: HttpRequest) => getWalletList(request),
  create: (request: HttpRequest) => postWalletCreate(request)
})