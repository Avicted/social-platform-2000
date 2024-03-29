import { Action } from 'redux'
import { IApiResponse } from '../../../models/IApiResponse'
import { ICreateCommentDto, IComment } from '../../../models/IComment'
import { IPost } from '../../../models/IPost'

export enum PostTypes {
    'GetPost' = 'Post/GetPost',
    'GetPostSuccess' = 'Post/GetPostSuccess',
    'GetPostError' = 'Post/GetPostError',

    'GetCommentsInPost' = 'Post/GetCommentsInPost',
    'GetCommentsInPostSuccess' = 'Post/GetCommentsInPostSuccess',
    'GetCommentsInPostError' = 'Post/GetCommentsInPostError',

    'PostComment' = 'Post/PostComment',
    'PostCommentSuccess' = 'Post/PostCommentSuccess',
    'PostCommentError' = 'Post/PostCommentError',
}

export interface GetPost extends Action {
    type: PostTypes.GetPost
    postId: number
}

export interface GetPostSuccess extends Action {
    type: PostTypes.GetPostSuccess
    response: IApiResponse<IPost>
}

export interface GetPostError extends Action {
    type: PostTypes.GetPostError
    error: string
}

export interface GetCommentsInPost extends Action {
    type: PostTypes.GetCommentsInPost
    postId: number
}
export interface GetCommentsInPostSuccess extends Action {
    type: PostTypes.GetCommentsInPostSuccess
    comments: IComment[]
}
export interface GetCommentsInPostError extends Action {
    type: PostTypes.GetCommentsInPostError
    error: string
}

export interface PostComment extends Action {
    type: PostTypes.PostComment
    data: ICreateCommentDto
}
export interface PostCommentSuccess extends Action {
    type: PostTypes.PostCommentSuccess
    comment: IComment
}
export interface PostCommentError extends Action {
    type: PostTypes.PostCommentError
    error: string
}

export const postActions = {
    GetPost: (postId: number): GetPost => ({
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
    GetCommentsInPost: (postId: number): GetCommentsInPost => ({
        type: PostTypes.GetCommentsInPost,
        postId,
    }),
    GetCommentsInPostSuccess: (comments: IComment[]): GetCommentsInPostSuccess => ({
        type: PostTypes.GetCommentsInPostSuccess,
        comments,
    }),
    GetCommentsInPostError: (error: string): GetCommentsInPostError => ({
        type: PostTypes.GetCommentsInPostError,
        error,
    }),
    PostComment: (data: ICreateCommentDto): PostComment => ({
        type: PostTypes.PostComment,
        data,
    }),
    PostCommentSuccess: (comment: IComment): PostCommentSuccess => ({
        type: PostTypes.PostCommentSuccess,
        comment,
    }),
    PostCommentError: (error: string) => ({
        type: PostTypes.PostCommentError,
        error,
    }),
}

export type PostActions =
    | GetPost
    | GetPostSuccess
    | GetPostError
    | GetCommentsInPost
    | GetCommentsInPostSuccess
    | GetCommentsInPostError
    | PostComment
    | PostCommentSuccess
    | PostCommentError
