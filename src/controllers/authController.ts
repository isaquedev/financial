
import { HttpRequest, HttpResponse } from "@adapters/routeAdapter";
import { postLogin } from "@useCases/auth";

export default Object.freeze({
  login: (request: HttpRequest) => postLogin(request),
  register: async (request: HttpRequest): Promise<HttpResponse> => {
    return {
      statusCode: 200,
      body: {}
    }
  }
})
