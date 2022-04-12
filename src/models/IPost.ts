export interface IPost {
    postId: number
    categoryId: string
    title: string
    content: string
    createdDate: string
    updatedDate: string
}

export interface ICreatePostRequest {
    title: string
    content: string
    categoryId: number
}

export interface IUpdatePostRequest {
    title: string
    content: string
    categoryId: string
}
