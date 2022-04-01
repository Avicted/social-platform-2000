import { Action } from "redux";
import { IApiResponse } from "../../../models/IApiResponse";
import { IPost } from "../../../models/IPost";

export enum PostlistTypes {
    'GetPosts' = 'Postlist/GetPosts',
    'GetPostsSuccess' = 'Postlist/GetPostsSuccess',
    'GetPostsError' = 'Postlist/GetPostsGetPostsError',
}

export interface GetPosts extends Action {
    type: PostlistTypes.GetPosts,
}

export interface GetPostsSuccess extends Action {
    type: PostlistTypes.GetPostsSuccess,
    response: IApiResponse<IPost[]>
}

export interface GetPostsError extends Action {
    type: PostlistTypes.GetPostsError,
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
}

export type PostlistActions =
    | GetPosts
    | GetPostsSuccess
    | GetPostsError
