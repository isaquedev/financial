import { HttpResponse } from "@adapters/routeAdapter";
import { EntryDAO } from "@dataAccess/makeEntryDAO";
import { HttpUserRequest } from "@middlewares/makeIsAuthenticated";

interface MakeEntryListDependecies {
  entryDAO: EntryDAO
}

export default ({ entryDAO }: MakeEntryListDependecies) => {
  return async function getEntryList(httpRequest: HttpUserRequest): Promise<HttpResponse> {
    try {
      const userId = httpRequest.userId!;

      const entries = await entryDAO.findAll(userId);
      
      return {
        statusCode: 200,
        body: {
          data: entries
        }
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