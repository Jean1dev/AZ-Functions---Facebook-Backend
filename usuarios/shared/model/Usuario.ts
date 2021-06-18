import * as Mongoose from 'mongoose';

export interface IUsuario extends Mongoose.Document {
  login: string
  photoURL?: string
  displayName: string
  idAutenticacao: string
  email?: string
}

const Usuario = new Mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  photoURL: {
    type: String,
  },
  email: {
    type: String,
  },
  displayName: {
    type: String,
    required: true
  },
  idAutenticacao: {
    type: String,
    required: true
  },
}, {
  timestamps: true,
  collection: 'usuarios'
})

export default Mongoose.model<IUsuario>('Usuario', Usuario)
