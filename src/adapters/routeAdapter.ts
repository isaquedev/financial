import { Request, Response } from "express"

type Controller = (request: HttpRequest) => Promise<HttpResponse>

export interface HttpRequest {
  body: any
  query: any
  headers: any
  params: any
}

export type IHttpRoute = (request: HttpRequest) => Promise<HttpResponse>

export interface HttpResponse {
  statusCode: number
  body?: Object
}

export default (controller: Controller) => async (req: Request, res: Response) => {
  const httpsResponse = await controller(req)

  if (httpsResponse.body) {
    return res.status(httpsResponse.statusCode).json(httpsResponse.body)
  }
  return res.status(httpsResponse.statusCode).json()
}
