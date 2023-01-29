import { getWalletList } from "@useCases/wallet";
import { HttpRequest, HttpResponse } from "../adapters/routeAdapter";

export default Object.freeze({
  getAll: (request: HttpRequest) => getWalletList(request)
})