import { IApiResponse } from '../models/IApiResponse'
import { IPost } from '../models/IPost'
import mockPosts from './mocks/posts.json'


export class ForumApi {
    getPosts = async (): Promise<IApiResponse<IPost[]> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                // Fetch data from the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/posts`

                const res: Response = await fetch(URI, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })

                if (!res.ok) throw res.statusText

                const data: IApiResponse<IPost[]> = {
                    ...await res.json(),
                }

                return data
            } else {
                let posts: IPost[] = mockPosts as unknown as IPost[]

                const response: IApiResponse<IPost[]> = {
                    result: posts,
                }

                return response
            }
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    getPost = async (postId: string): Promise<IApiResponse<IPost> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                // Fetch data from the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}`

                const res: Response = await fetch(URI, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })

                if (!res.ok) throw res.statusText

                const data: IApiResponse<IPost> = {
                    ...await res.json(),
                }

                return data
            } else {
                let post: IPost = mockPosts[0] as unknown as IPost

                const response: IApiResponse<IPost> = {
                    result: post
                }

                return response
            }
        } catch (error) {
            console.error(error)
            return undefined
        }
    }
}