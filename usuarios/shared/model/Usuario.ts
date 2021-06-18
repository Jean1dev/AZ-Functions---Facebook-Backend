import * as Mongoose from 'mongoose';

export interface IUsuario extends Mongoose.Document {
  nome: string
  photoUrl?: string
  displayName: string
  idAutenticacao: string
}

const Usuario = new Mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  photoUrl: {
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
