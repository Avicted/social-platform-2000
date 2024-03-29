export interface ICategory {
    categoryId: string
    title: string
    postsCount: number
    createdDate: string
    updatedDate: string
}

export interface IUpdateCategoryRequest {
    title: string
}
