import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { ForumApi } from "../../../api/ForumApi";
import { IApiResponse } from '../../../models/IApiResponse';
import { IPost } from '../../../models/IPost';
import { GetPosts, postlistActions, PostlistTypes } from "../actions/PostlistActions";


const forumApi = new ForumApi()

// Watcher saga
export function* getPostsSaga() {
    yield takeLatest(PostlistTypes.GetPosts, getPostsFlow)
}

// Worker saga
function* getPostsFlow(action: GetPosts) {
    // Simulate API delay
    yield delay(500)

    try {
        const response: IApiResponse<IPost[]> = yield call(forumApi.getPosts)
        console.log(response)

        if (response.error) {
            console.error(response.error)
            throw new Error(response.error)
        }

        yield put(postlistActions.GetPostsSuccess(response))

    } catch (error) {
        yield put(postlistActions.GetPostsError(error as string))
    }
}
