import produce from "immer"
import { IPost } from "../../../models/IPost"
import { PostActions, PostTypes } from "../actions/PostActions"

// State definition
interface PostState {
    post: IPost | undefined,
    error: string | undefined
    isLoading: boolean
}

const initialState: PostState = {
    post: undefined,
    error: undefined,
    isLoading: false,
}

export function postReducer(state: PostState = initialState, action: PostActions) {
    switch (action.type) {
        case PostTypes.GetPost:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = true
            })
        case PostTypes.GetPostSuccess:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = false
                draft.post = action.response.result
            })
        case PostTypes.GetPostError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.isLoading = false
                draft.post = undefined
            })

        default:
            return state
    }
}
