import { HttpRequest, HttpResponse } from "../adapters/routeAdapter";

export default Object.freeze({
  getAll: async (request: HttpRequest): Promise<HttpResponse> => {
    return {
      statusCode: 200,
      body: {
        message: `Wallets`
      }
    }
  }
})