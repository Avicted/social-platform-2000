import produce from 'immer'
import { ICategory } from '../../../models/ICategory'
import { IPost } from '../../../models/IPost'
import { PostListActions, PostlistTypes } from '../actions/PostlistActions'

// State definition
interface PostListState {
    posts: IPost[]
    error: string | undefined
    isLoading: boolean
    showCreatePostDialog: boolean
}

const initialState: PostListState = {
    posts: [],
    error: undefined,
    isLoading: false,
    showCreatePostDialog: false,
}

export function postlistReducer(state: PostListState = initialState, action: PostListActions) {
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
                draft.posts = action.response.result
            })
        case PostlistTypes.GetPostsError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.isLoading = false
                draft.posts = []
            })
        case PostlistTypes.ToggleCreatePostDialog:
            return produce(state, (draft) => {
                draft.showCreatePostDialog = !draft.showCreatePostDialog
            })

        case PostlistTypes.CreatePost:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = true
            })
        case PostlistTypes.CreatePostSuccess:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = false
            })
        case PostlistTypes.CreatePostError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.isLoading = false
            })

        default:
            return state
    }
}
