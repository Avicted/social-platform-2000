import produce from 'immer'
import { ICategory } from '../../../models/ICategory'
import { IPost } from '../../../models/IPost'
import { PostlistActions, PostlistTypes } from '../actions/PostlistActions'

// State definition
interface PostlistState {
    categories: ICategory[]
    posts: IPost[]
    error: string | undefined
    isLoading: boolean
    showCreatePostDialog: boolean
}

const initialState: PostlistState = {
    categories: [],
    posts: [],
    error: undefined,
    isLoading: false,
    showCreatePostDialog: false,
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
        case PostlistTypes.GetCategories:
            return produce(state, (draft) => {
                draft.error = undefined
                draft.isLoading = true
            })
        case PostlistTypes.GetCategoriesSuccess:
            return produce(state, (draft) => {
                draft.categories = action.response.result
                draft.error = undefined
                draft.isLoading = false
            })
        case PostlistTypes.GetCategoriesError:
            return produce(state, (draft) => {
                draft.error = action.error
                draft.isLoading = false
            })

        default:
            return state
    }
}
