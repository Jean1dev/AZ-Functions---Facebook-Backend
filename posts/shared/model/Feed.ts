import { IPost } from './Post';
import * as Mongoose from 'mongoose'

export interface IFeed extends Mongoose.Document {
  username: string
  posts: IPost[]
}

const Feed = new Mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  posts: {
    type: Array
  }
}, {
  collection: 'feed'
})

export default Mongoose.model<IFeed>('Feed', Feed)
