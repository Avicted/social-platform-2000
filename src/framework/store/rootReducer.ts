import { combineReducers } from 'redux'
import { categoryListReducer } from '../../pages/categorylist/reducers/CategoryListReducer'
import { loginReducer } from '../../pages/login/reducers/LoginReducer'
import { postReducer } from '../../pages/post/reducers/PostReducer'
import { postlistReducer } from '../../pages/postlist/reducers/PostlistReducer'

const rootReducer = combineReducers({
    postList: postlistReducer,
    posts: postReducer,
    categoryList: categoryListReducer,
    login: loginReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
