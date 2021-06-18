import * as DotEnv from 'dotenv'
import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import UsuarioModel from '../shared/model/Usuario'
import axios from 'axios'
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
        const { data } = await axios.post(`${process.env.BASE_URL_AUTH_SERVICE}/api/criar-usuario`, {
            login,
            password
        })

        const usuario = new UsuarioModel({
            nome: login,
            displayName: login,
            idAutenticacao: data._id
        })

        const usuarioSave = await usuario.save()
        context.res = {
            body: usuarioSave
        }
    } catch (error) {
        context.log(error.message)
        throw error
    }
};

export default httpTrigger;
