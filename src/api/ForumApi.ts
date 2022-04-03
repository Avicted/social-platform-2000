import { IApiResponse } from '../models/IApiResponse'
import { ICategory } from '../models/ICategory'
import { ICreatePostRequest, IPost } from '../models/IPost'
import mockPosts from './mocks/posts.json'

export class ForumApi {
    getCategories = async (): Promise<IApiResponse<ICategory[]> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                // Fetch data from the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/category`

                const res: Response = await fetch(URI, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })

                if (!res.ok) throw res.statusText

                const data: IApiResponse<ICategory[]> = {
                    ...(await res.json()),
                }

                return data
            } else {
            }
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

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
                    ...(await res.json()),
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
                    ...(await res.json()),
                }

                return data
            } else {
                let post: IPost = mockPosts[0] as unknown as IPost

                const response: IApiResponse<IPost> = {
                    result: post,
                }

                return response
            }
        } catch (error) {
            console.error(error)
            return undefined
        }
    }

    createPost = async (post: ICreatePostRequest): Promise<IApiResponse<IPost | undefined>> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                // Fetch data from the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/posts`

                const res: Response = await fetch(URI, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(post),
                })

                if (!res.ok) throw res.statusText

                const data: IApiResponse<IPost> = {
                    ...(await res.json()),
                }

                return data
            } else {
                let post: IPost = mockPosts[0] as unknown as IPost

                const response: IApiResponse<IPost> = {
                    result: post,
                }

                return response
            }
        } catch (error) {
            console.error(error)
            return error as IApiResponse<undefined>
        }
    }
}
