import produce from 'immer'
import { ICategory } from '../../../models/ICategory'
import { CategoryListActions, CategoryListTypes } from '../actions/CategoryListActions'

// State definition
interface CategoryListState {
    categories: ICategory[]
    totalItemsCount: number | undefined
    totalPages: number | undefined
    error: string | undefined
    isLoading: boolean
}

const initialState: CategoryListState = {
    categories: [],
    totalItemsCount: undefined,
    totalPages: undefined,
    error: undefined,
    isLoading: false,
}

export function categoryListReducer(state: CategoryListState = initialState, action: CategoryListActions) {
    switch (action.type) {
        case CategoryListTypes.GetCategories:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.totalItemsCount = undefined
                draft.totalPages = undefined
                draft.isLoading = true
            })
        case CategoryListTypes.GetCategoriesSuccess:
            return produce(state, (draft) => {
                draft.categories = action.response.result
                draft.totalItemsCount = action.response.pagination?.totalItemsCount
                draft.totalPages = action.response.pagination?.totalPages
                draft.error = undefined
                draft.isLoading = false
            })
        case CategoryListTypes.GetCategoriesError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.totalItemsCount = undefined
                draft.totalPages = undefined
                draft.isLoading = false
            })

        default:
            return state
    }
}
