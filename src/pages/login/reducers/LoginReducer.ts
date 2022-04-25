import produce from 'immer'
import { IUser } from '../../../models/IUser'
import { LoginActions, LoginTypes } from '../actions/LoginActions'

// State definition
interface LoginState {
    error: string | undefined
    isLoading: boolean
    user: IUser | undefined
}

const initialState: LoginState = {
    error: undefined,
    isLoading: false,
    user: undefined,
}

export function loginReducer(state: LoginState = initialState, action: LoginActions) {
    switch (action.type) {
        case LoginTypes.Login:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = true
            })
        case LoginTypes.LoginSuccessful:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = false
                draft.user = action.data
            })
        case LoginTypes.LoginError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.isLoading = false
                draft.user = undefined
            })

        case LoginTypes.Logout:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = false
                draft.user = undefined
            })

        default:
            return state
    }
}
