import * as walletUseCases from "@useCases/wallet";
import { HttpRequest } from "../adapters/routeAdapter";

export default Object.freeze({
  getAll: (request: HttpRequest) => walletUseCases.getWalletList(request),
  getAllEntries: (request: HttpRequest) => walletUseCases.getWalletEntriesList(request),
  find: (request: HttpRequest) => walletUseCases.getWalletById(request),
  create: (request: HttpRequest) => walletUseCases.postWalletCreate(request),
  update: (request: HttpRequest) => walletUseCases.putWalletUpdate(request),
  remove: (request: HttpRequest) => walletUseCases.deleteWalletRemove(request),
})