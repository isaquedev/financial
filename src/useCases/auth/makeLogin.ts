import { HttpRequest, HttpResponse } from "@adapters/routeAdapter";
import { UserDAO } from "@dataAccess/makeUserDAO";
import { AuthService } from "@services/authService";

interface MakeLoginDependencies {
  userDAO: UserDAO,
  authService: AuthService
}

interface PostLoginBody {
  email: string,
  password: string
}

export default ({ userDAO, authService }: MakeLoginDependencies) => {
  return async function postLogin(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body as PostLoginBody;

      const user = await userDAO.findByEmail(email);

      if (!user) {
        return {
          statusCode: 401,
          body: {
            error: 'Invalid credentials'
          }
        }
      }
      
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