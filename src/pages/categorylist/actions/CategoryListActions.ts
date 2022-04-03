import { Action } from 'redux'
import { IApiResponse } from '../../../models/IApiResponse'
import { ICategory } from '../../../models/ICategory'

export enum CategoryListTypes {
    'GetCategories' = 'CategoryList/GetCategories',
    'GetCategoriesSuccess' = 'CategoryList/GetCategoriesSuccess',
    'GetCategoriesError' = 'CategoryList/GetCategoriesError',
}

export interface GetCategories extends Action {
    type: CategoryListTypes.GetCategories
}

export interface GetCategoriesSuccess extends Action {
    type: CategoryListTypes.GetCategoriesSuccess
    response: IApiResponse<ICategory[]>
}

export interface GetCategoriesError extends Action {
    type: CategoryListTypes.GetCategoriesError
    error: string
}

export const categoryListActions = {
    GetCategories: (): GetCategories => ({
        type: CategoryListTypes.GetCategories,
    }),
    GetCategoriesSuccess: (response: IApiResponse<ICategory[]>): GetCategoriesSuccess => ({
        type: CategoryListTypes.GetCategoriesSuccess,
        response,
    }),
    GetCategoriesError: (error: string) => ({
        type: CategoryListTypes.GetCategoriesError,
        error,
    }),
}

export type CategoryListActions = GetCategories | GetCategoriesSuccess | GetCategoriesError
