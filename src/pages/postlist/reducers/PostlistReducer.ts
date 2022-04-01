import produce from "immer"
import { IPost } from "../../../models/IPost"
import { PostlistActions, PostlistTypes } from "../actions/PostlistActions"


// State definition
interface PostlistState {
    posts: IPost[],
    error: string | undefined
    isLoading: boolean
}

const initialState: PostlistState = {
    posts: [],
    error: undefined,
    isLoading: false,
}

export function postlistReducer(state: PostlistState = initialState, action: PostlistActions) {
    switch (action.type) {
        case PostlistTypes.GetPosts:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = true
            })
        case PostlistTypes.GetPostsSuccess:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = false
                draft.posts = action.response.data
            })
        case PostlistTypes.GetPostsError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.isLoading = false
                draft.posts = []
            })

        default:
            return state
    }
}
