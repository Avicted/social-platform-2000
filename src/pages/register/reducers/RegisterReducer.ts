import produce from 'immer'
import { RegisterActions, RegisterTypes } from '../actions/RegisterActions'

// State definition
interface RegisterState {
    error: string | undefined
    isLoading: boolean
}

const initialState: RegisterState = {
    error: undefined,
    isLoading: false,
}

export function registerReducer(state: RegisterState = initialState, action: RegisterActions) {
    switch (action.type) {
        case RegisterTypes.Register:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = true
            })
        case RegisterTypes.RegisterSuccessful:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = false
            })
        case RegisterTypes.RegisterError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.isLoading = false
            })
        default:
            return state
    }
}
