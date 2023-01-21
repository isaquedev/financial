import { HttpRequest, HttpResponse } from "@adapters/routeAdapter";
import { UserDAO } from "@dataAccess/makeUserDB";

interface MakeLogin {
  userDAO: UserDAO
}

export default ({ userDAO }: MakeLogin) => {
  return async function postLogin(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      
      return {
        statusCode: 200,
        body: {}
      }
    } catch (error: any) {
      console.error(error);
      return {
        statusCode: 400,
        body: {
          error: error.message
        }
      }
    }
  }
}