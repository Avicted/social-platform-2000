import { IApiResponse } from '../models/IApiResponse'
import { ICategory } from '../models/ICategory'
import { CreateCommentDto, IComment } from '../models/IComment'
import { ICreatePostRequest, IPost } from '../models/IPost'
import mockPosts from './mocks/posts.json'

export class ForumApi {
    getCategories = async (): Promise<IApiResponse<ICategory[]> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                // Fetch data from the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/categories`

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

    getPosts = async (categoryId: number): Promise<IApiResponse<IPost[]> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                // Fetch data from the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/categories/${categoryId}/posts`

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

    getPost = async (postId: number): Promise<IApiResponse<IPost> | undefined> => {
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
                // Post data to the API
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

    getCommentsInPost = async (postId: number): Promise<IApiResponse<IComment[] | undefined>> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                // Fetch data from the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/posts/${postId}/comments`

                const res: Response = await fetch(URI, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })

                if (!res.ok) throw res.statusText

                const data: IApiResponse<IComment[]> = {
                    ...(await res.json()),
                }

                return data
            }
            return 'NOT_IMPLEMENTED' as unknown as IApiResponse<undefined>
        } catch (error) {
            console.error(error)
            return error as IApiResponse<undefined>
        }
    }

    postComment = async (createCommentDto: CreateCommentDto): Promise<IApiResponse<IComment | undefined>> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                // Post data to the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/comments`

                const res: Response = await fetch(URI, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(createCommentDto),
                })

                if (!res.ok) throw res.statusText

                const data: IApiResponse<IComment> = {
                    ...(await res.json()),
                }

                return data
            }
            return 'NOT_IMPLEMENTED' as unknown as IApiResponse<undefined>
        } catch (error) {
            console.error(error)
            return error as IApiResponse<undefined>
        }
    }
}
