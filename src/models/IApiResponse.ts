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
}
