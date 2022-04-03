import { Action } from 'redux'
import { IApiResponse } from '../../../models/IApiResponse'
import { ICategory } from '../../../models/ICategory'
import { ICreatePostRequest, IPost } from '../../../models/IPost'

export enum PostlistTypes {
    'GetPosts' = 'Postlist/GetPosts',
    'GetPostsSuccess' = 'Postlist/GetPostsSuccess',
    'GetPostsError' = 'Postlist/GetPostsGetPostsError',

    'ToggleCreatePostDialog' = 'Postlist/ToggleCreatePostDialog',

    'CreatePost' = 'Postlist/CreatePost',
    'CreatePostSuccess' = 'Postlist/CreatePostSuccess',
    'CreatePostError' = 'Postlist/CreatePostError',

    'GetCategories' = 'Postlist/GetCategories',
    'GetCategoriesSuccess' = 'Postlist/GetCategoriesSuccess',
    'GetCategoriesError' = 'Postlist/GetCategoriesError',
}

export interface GetPosts extends Action {
    type: PostlistTypes.GetPosts
}

export interface GetPostsSuccess extends Action {
    type: PostlistTypes.GetPostsSuccess
    response: IApiResponse<IPost[]>
}

export interface GetPostsError extends Action {
    type: PostlistTypes.GetPostsError
    error: string
}

export interface ToggleCreatePostDialog extends Action {
    type: PostlistTypes.ToggleCreatePostDialog
}

export interface CreatePost extends Action {
    type: PostlistTypes.CreatePost
    post: ICreatePostRequest
}

export interface CreatePostSuccess extends Action {
    type: PostlistTypes.CreatePostSuccess
    response: IApiResponse<IPost>
}

export interface CreatePostError extends Action {
    type: PostlistTypes.CreatePostError
    error: string
}

export interface GetCategories extends Action {
    type: PostlistTypes.GetCategories
}

export interface GetCategoriesSuccess extends Action {
    type: PostlistTypes.GetCategoriesSuccess
    response: IApiResponse<ICategory[]>
}

export interface GetCategoriesError extends Action {
    type: PostlistTypes.GetCategoriesError
    error: string
}

export const postlistActions = {
    GetPosts: (): GetPosts => ({
        type: PostlistTypes.GetPosts,
    }),
    GetPostsSuccess: (response: IApiResponse<IPost[]>): GetPostsSuccess => ({
        type: PostlistTypes.GetPostsSuccess,
        response,
    }),
    GetPostsError: (error: string): GetPostsError => ({
        type: PostlistTypes.GetPostsError,
        error,
    }),
    ToggleCreatePostDialog: (): ToggleCreatePostDialog => ({
        type: PostlistTypes.ToggleCreatePostDialog,
    }),
    CreatePost: (post: ICreatePostRequest): CreatePost => ({
        type: PostlistTypes.CreatePost,
        post,
    }),
    CreatPostSuccess: (response: IApiResponse<IPost>) => ({
        type: PostlistTypes.CreatePostSuccess,
        response,
    }),
    CreatePostError: (error: string): CreatePostError => ({
        type: PostlistTypes.CreatePostError,
        error,
    }),
    GetCategories: (): GetCategories => ({
        type: PostlistTypes.GetCategories,
    }),
    GetCategoriesSuccess: (response: IApiResponse<ICategory[]>): GetCategoriesSuccess => ({
        type: PostlistTypes.GetCategoriesSuccess,
        response,
    }),
    GetCategoriesError: (error: string) => ({
        type: PostlistTypes.GetCategoriesError,
        error,
    }),
}

export type PostlistActions =
    | GetPosts
    | GetPostsSuccess
    | GetPostsError
    | ToggleCreatePostDialog
    | CreatePost
    | CreatePostSuccess
    | CreatePostError
    | GetCategories
    | GetCategoriesSuccess
    | GetCategoriesError
