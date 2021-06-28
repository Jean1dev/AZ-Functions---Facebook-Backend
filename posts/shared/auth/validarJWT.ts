import { Context, HttpRequest } from '@azure/functions'
import axios from 'axios'

export default async (context: Context, req: HttpRequest) => {
  if (!req.headers.authorization) {
    const message = 'Parametro Authorization não informado'
    context.res = {
      status: 404,
      body: { message }
    }
    throw new Error(message)
  }

  const { data } = await axios.post(`${process.env.BASE_URL_AUTH_SERVICE}/api/validar-token-acesso`, {
    authorization: req.headers.authorization
  }, {
    params: {
      code: process.env.AUTH_TOKEN
    }
  })

  //@ts-ignore
  context.auth = data
}
