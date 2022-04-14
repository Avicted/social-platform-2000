export interface IApiResponse<T> {
    isError?: boolean
    message?: string
    responseException?: {
        exceptionMessage: {
            title: string
            status: number
        }
    }
    result: T
    pagination?: {
        currentPage: number
        pageSize: number
        totalItemsCount: number
        totalPages: number
    }
}
