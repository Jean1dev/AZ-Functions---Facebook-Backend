import * as DotEnv from 'dotenv'
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import PostModel from '../shared/model/Post'
import * as mongoose from 'mongoose'
import validateJwt from '../shared/auth/validarJWT'
import cosmosDBTrigger from '../calcular-feed'

DotEnv.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('conectado com o mongo')
})

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const {
        message,
        profilePic,
        username,
        image
    } = req.body

    const post = new PostModel({
        message,
        profilePic,
        username,
        image
    })

    await post.save()
    cosmosDBTrigger(context, [post])
};

export default async (context, req) => {
    await validateJwt(context, req)
    await httpTrigger(context, req)
}
