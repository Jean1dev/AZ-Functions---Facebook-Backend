import * as Mongoose from 'mongoose'

export interface IPost extends Mongoose.Document {
  message: string
  profilePic: string
  username: string
  image: string
}

const Post = new Mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  image: {
    type: String,
  }
}, {
  timestamps: true,
  collection: 'posts'
})

export default Mongoose.model<IPost>('Post', Post)
