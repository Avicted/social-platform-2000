import produce from 'immer'
import { ICategory } from '../../../models/ICategory'
import { CategoryListActions, CategoryListTypes } from '../actions/CategoryListActions'

// State definition
interface CategoryListState {
    categories: ICategory[]
    error: string | undefined
    isLoading: boolean
}

const initialState: CategoryListState = {
    categories: [],
    error: undefined,
    isLoading: false,
}

export function categoryListReducer(state: CategoryListState = initialState, action: CategoryListActions) {
    switch (action.type) {
        case CategoryListTypes.GetCategories:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = true
            })
        case CategoryListTypes.GetCategoriesSuccess:
            return produce(state, (draft) => {
                draft.categories = action.response.result
                draft.error = undefined
                draft.isLoading = false
            })
        case CategoryListTypes.GetCategoriesError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.isLoading = false
            })

        default:
            return state
    }
}
