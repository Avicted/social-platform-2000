export interface IApiResponse<T> {
    error?: string // a single error
    errors?: { [key: string]: string[] } // form field errors: <field_name: Error string>
    code?: number
    message?: string
    data: T
}