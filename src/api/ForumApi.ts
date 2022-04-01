import { IApiResponse } from '../models/IApiResponse'
import { IPost } from '../models/IPost'
import mockPosts from './mocks/posts.json'


export class ForumApi {
    getPosts = async (): Promise<IApiResponse<IPost[]> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'false') {
                let posts: IPost[] = mockPosts as unknown as IPost[]

                const response: IApiResponse<IPost[]> = {
                    data: posts,
                }

                return response
            } else {
                // Fetch data from the API
                return undefined
            }
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    getPost = async (): Promise<IApiResponse<IPost> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'false') {
                let post: IPost = mockPosts[0] as unknown as IPost

                const response: IApiResponse<IPost> = {
                    data: post
                }

                return response
            } else {
                // Fetch data from the API
                return undefined
            }
        } catch (error) {
            console.error(error)
            return undefined
        }
    }
}