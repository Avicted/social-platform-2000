export interface IPost {
    id: string
    title: string
    content: string
    createdDate: string
    updatedDate: string
}

export interface ICreatePostRequest {
    title: string
    content: string
}