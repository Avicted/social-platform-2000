import produce from 'immer'
import { IComment } from '../../../models/IComment'
import { IPost } from '../../../models/IPost'
import { PostActions, PostTypes } from '../actions/PostActions'

// State definition
interface PostState {
    post: IPost | undefined
    comments: IComment[] | undefined
    error: string | undefined
    isLoading: boolean
    isLoadingComments: boolean
    isLoadingPosingComment: boolean
}

const initialState: PostState = {
    post: undefined,
    comments: undefined,
    error: undefined,
    isLoading: false,
    isLoadingComments: false,
    isLoadingPosingComment: false,
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

        case PostTypes.GetCommentsInPost:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoadingComments = true
                draft.comments = undefined
            })
        case PostTypes.GetCommentsInPostSuccess:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoadingComments = false
                draft.comments = action.comments
            })
        case PostTypes.GetCommentsInPostError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.isLoadingComments = false
                draft.comments = undefined
            })

        case PostTypes.PostComment:
            return produce(state, (draft) => {
                draft.isLoadingPosingComment = true
                draft.error = ''
            })
        case PostTypes.PostCommentSuccess:
            return produce(state, (draft) => {
                draft.isLoadingPosingComment = false
                draft.error = ''
            })
        case PostTypes.PostCommentError:
            return produce(state, (draft) => {
                draft.isLoadingPosingComment = false
                draft.error = action.error
            })

        default:
            return state
    }
}
