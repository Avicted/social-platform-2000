export interface IComment {
    commentId: number
    authorName: string
    content: string
    postId: number
    parentCommentId?: number
    parentsCount: number
    createdDate: string
    updatedDate: string

    comments: IComment[]
}

export interface ICreateCommentDto {
    authorName: string
    content: string
    postId: number
    parentCommentId?: number
}

export interface IUpdateComment {
    content: string
}
