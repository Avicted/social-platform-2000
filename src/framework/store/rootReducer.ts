import { combineReducers } from 'redux'
import { postReducer } from '../../pages/post/reducers/PostReducer'
import { postlistReducer } from '../../pages/postlist/reducers/PostlistReducer'


const rootReducer = combineReducers({
    postlist: postlistReducer,
    post: postReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer