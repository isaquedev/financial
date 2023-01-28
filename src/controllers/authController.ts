
import { HttpRequest } from "@adapters/routeAdapter";
import { postLogin, postRegister } from "@useCases/auth";

export default Object.freeze({
  login: (request: HttpRequest) => postLogin(request),
  register: async (request: HttpRequest) => postRegister(request)
})
