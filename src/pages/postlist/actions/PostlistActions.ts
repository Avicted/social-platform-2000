import { Action } from 'redux'
import { IApiResponse } from '../../../models/IApiResponse'
import { ICategory } from '../../../models/ICategory'
import { ICreatePostRequest, IPost } from '../../../models/IPost'
import { IPostQuery } from '../../../models/IPostQuery'

export enum PostlistTypes {
    'GetPosts' = 'Postlist/GetPosts',
    'GetPostsSuccess' = 'Postlist/GetPostsSuccess',
    'GetPostsError' = 'Postlist/GetPostsError',

    'ToggleCreatePostDialog' = 'Postlist/ToggleCreatePostDialog',

    'CreatePost' = 'Postlist/CreatePost',
    'CreatePostSuccess' = 'Postlist/CreatePostSuccess',
    'CreatePostError' = 'Postlist/CreatePostError',

    // @Todo(Avic): GetParentCategory -> change
    'GetCategoryTitle' = 'PostList/GetCategoryTitle',
    'GetCategoryTitleSuccess' = 'PostList/GetCategoryTitleSuccess',
    'GetCategoryTitleError' = 'PostList/GetCategoryTitleError',
}

export interface GetPosts extends Action {
    type: PostlistTypes.GetPosts
    categoryId: number
    query: IPostQuery
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

export interface GetCategoryTitle extends Action {
    type: PostlistTypes.GetCategoryTitle
    categoryId: number
}
export interface GetCategoryTitleSuccess extends Action {
    type: PostlistTypes.GetCategoryTitleSuccess
    category: ICategory
}
export interface GetCategoryTitleError extends Action {
    type: PostlistTypes.GetCategoryTitleError
    error: string
}

export const postlistActions = {
    GetPosts: (categoryId: number, query: IPostQuery): GetPosts => ({
        type: PostlistTypes.GetPosts,
        categoryId,
        query,
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
    GetCategoryTitle: (categoryId: number): GetCategoryTitle => ({
        type: PostlistTypes.GetCategoryTitle,
        categoryId,
    }),
    GetCategoryTitleSuccess: (category: ICategory): GetCategoryTitleSuccess => ({
        type: PostlistTypes.GetCategoryTitleSuccess,
        category,
    }),
    GetCategoryTitleError: (error: string): GetCategoryTitleError => ({
        type: PostlistTypes.GetCategoryTitleError,
        error,
    }),
}

export type PostListActions =
    | GetPosts
    | GetPostsSuccess
    | GetPostsError
    | ToggleCreatePostDialog
    | CreatePost
    | CreatePostSuccess
    | CreatePostError
    | GetCategoryTitle
    | GetCategoryTitleSuccess
    | GetCategoryTitleError
