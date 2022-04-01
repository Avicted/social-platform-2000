import { combineReducers } from 'redux'
import { postlistReducer } from '../../pages/postlist/reducers/PostlistReducer'


const rootReducer = combineReducers({
    postlist: postlistReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export default rootReducer