import { Action } from "redux";
import { IApiResponse } from "../../../models/IApiResponse";
import { IPost } from "../../../models/IPost";

export enum PostTypes {
    'GetPost' = 'Post/GetPost',
    'GetPostSuccess' = 'Post/GetPostSuccess',
    'GetPostError' = 'Post/GetPostsGetPostError',
}

export interface GetPost extends Action {
    type: PostTypes.GetPost,
    postId: string
}

export interface GetPostSuccess extends Action {
    type: PostTypes.GetPostSuccess,
    response: IApiResponse<IPost>
}

export interface GetPostError extends Action {
    type: PostTypes.GetPostError,
    error: string
}

export const postActions = {
    GetPost: (postId: string): GetPost => ({
        type: PostTypes.GetPost,
        postId,
    }),
    GetPostSuccess: (response: IApiResponse<IPost>): GetPostSuccess => ({
        type: PostTypes.GetPostSuccess,
        response,
    }),
    GetPostError: (error: string): GetPostError => ({
        type: PostTypes.GetPostError,
        error,
    }),
}

export type PostActions =
    | GetPost
    | GetPostSuccess
    | GetPostError
