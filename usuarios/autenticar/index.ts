import * as DotEnv from 'dotenv'
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import UsuarioModel from '../shared/model/Usuario'
import axios from 'axios';
import * as mongoose from 'mongoose'

DotEnv.config()

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('conectado com o mongo')
})

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { login, password } = req.body

    try {
        const { data: { token } } = await axios.post(`${process.env.BASE_URL_AUTH_SERVICE}/api/autenticar-via-login-password`, {
            login,
            password
        })

        const usuario = await UsuarioModel.findOne({ login })
        context.res = {
            body: {
                usuario,
                token
            }
        }
    } catch (error) {
        context.log(error.message)
        context.res = {
            status: 404
        }
    }
};

export default httpTrigger;
