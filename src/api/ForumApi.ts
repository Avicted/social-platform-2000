import store from '../framework/store'
import { IApiResponse } from '../models/IApiResponse'
import { ICategory } from '../models/ICategory'
import { ICategoryQuery } from '../models/ICategoryQuery'
import { ICreateCommentDto, IComment } from '../models/IComment'
import { ILoginRequest } from '../models/ILoginRequest'
import { ICreatePostRequest, IPost } from '../models/IPost'
import { IPostQuery } from '../models/IPostQuery'
import { IUser } from '../models/IUser'
import mockPosts from './mocks/posts.json'

const { fetch: originalFetch } = window

// Global request interceptor
window.fetch = async (...args) => {
    let [resource, config] = args

    // request interceptor starts
    console.log(`======== request interceptor ========`)

    const user = store.getState().login.user
    // Add the Bearer token
    if (user && config) {
        console.log(`Adding the Bearer token to the request Authorization header`)

        const requestHeaders: HeadersInit = new Headers()
        requestHeaders.set('Authorization', `Bearer ${user.accessToken}`)
        requestHeaders.set('Accept', 'application/json')
        requestHeaders.set('Content-Type', 'application/json')

        config.headers = requestHeaders
    }

    // request interceptor ends
    let response = await originalFetch(resource, config)

    // Global error handling
    if (!response.ok && response.status === 404) {
        // 404 error handling
        return Promise.reject(response)
    }
    if (!response.ok && response.status === 401) {
        // 404 error handling
        window.location.pathname = 'login'
        return Promise.reject(response)
    }

    // response interceptor here
    return response
}

export class ForumApi {
    login = async (loginRequest: ILoginRequest): Promise<IApiResponse<IUser> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                // Post data to the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/authentication/login`

                const res: Response = await fetch(URI, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(loginRequest),
                })

                if (!res.ok) throw res.statusText

                const data: IApiResponse<IUser> = {
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

    getCategories = async (query: ICategoryQuery): Promise<IApiResponse<ICategory[]> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                const { pageSize, pageNumber } = query

                const searchParams = new URLSearchParams()
                searchParams.set('PageSize', pageSize.toString())
                searchParams.set('PageNumber', pageNumber.toString())

                // Fetch data from the API
                let URI: string = `${process.env.REACT_APP_API_BASE_URL}/categories?${searchParams.toString()}`

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

    getPosts = async (categoryId: number, query: IPostQuery): Promise<IApiResponse<IPost[]> | undefined> => {
        try {
            if (process.env.REACT_APP_USE_LIVE_DATA_API === 'true') {
                const { pageSize, pageNumber } = query

                const searchParams = new URLSearchParams()
                searchParams.set('PageSize', pageSize.toString())
                searchParams.set('PageNumber', pageNumber.toString())

                // Fetch data from the API
                let URI: string = `${
                    process.env.REACT_APP_API_BASE_URL
                }/categories/${categoryId}/posts?${searchParams.toString()}`

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

    postComment = async (createCommentDto: ICreateCommentDto): Promise<IApiResponse<IComment | undefined>> => {
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
