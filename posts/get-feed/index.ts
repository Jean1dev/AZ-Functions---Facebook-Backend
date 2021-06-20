import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import FeedModel from '../shared/model/Feed'
import validateJwt from '../shared/auth/validarJWT'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    //@ts-ignore
    const username = context.auth

    const resultados = await FeedModel.find({ username })
    context.res = {
        body: resultados
    }
};

export default async (context, req) => {
    await validateJwt(context, req)
    await httpTrigger(context, req)
}

