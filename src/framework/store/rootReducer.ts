import { combineReducers } from 'redux'
import { categoryListReducer } from '../../pages/categorylist/reducers/CategoryListReducer'
import { loginReducer } from '../../pages/login/reducers/LoginReducer'
import { postReducer } from '../../pages/post/reducers/PostReducer'
import { postlistReducer } from '../../pages/postlist/reducers/PostlistReducer'
import { registerReducer } from '../../pages/register/reducers/RegisterReducer'

const rootReducer = combineReducers({
    postList: postlistReducer,
    posts: postReducer,
    categoryList: categoryListReducer,
    login: loginReducer,
    register: registerReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer
