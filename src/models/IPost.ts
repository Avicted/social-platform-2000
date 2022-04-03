export interface IPost {
    postId: string
    title: string
    content: string
    createdDate: string
    updatedDate: string
}

export interface ICreatePostRequest {
    title: string
    content: string
}
