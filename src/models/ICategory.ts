import { IPost } from './IPost'

export interface ICategory {
    categoryId: string
    title: string
    posts: IPost[]
    createdDate: string
    updatedDate: string
}
