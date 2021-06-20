import { IPost } from './../shared/model/Post';
import { AzureFunction, Context } from "@azure/functions"
import FeedModel from '../shared/model/Feed';

const cosmosDBTrigger: AzureFunction = async function (context: Context, documents: IPost[]): Promise<void> {
    if (!!documents && documents.length > 0) {
        documents.forEach(post => {
            FeedModel.findOne({ username: post.username }, (err, feed) => {
                if (err || !feed) {
                    const feed = new FeedModel({
                        username: post.username,
                        posts: [ post ]
                    })

                    feed.save()
                    return
                }

                if (feed.posts instanceof Array) {
                    feed.posts.push(post)
                } else {
                    feed.posts = []
                    feed.posts.push(post)
                }

                feed.save()
            })
        })

    }
}





export default cosmosDBTrigger;
