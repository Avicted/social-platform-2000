import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { ForumApi } from "../../../api/ForumApi";
import { IApiResponse } from '../../../models/IApiResponse';
import { IPost } from '../../../models/IPost';
import { GetPost, postActions, PostTypes } from '../../post/actions/PostActions';

const forumApi = new ForumApi()

// Watcher saga
export function* getPostSaga() {
    yield takeLatest(PostTypes.GetPost, getPostFlow)
}
// Worker saga
function* getPostFlow(action: GetPost) {
    // Simulate API delay
    yield delay(500)

    try {
        const response: IApiResponse<IPost> = yield call(forumApi.getPost)
        console.log(response)

        if (response.error) {
            console.error(response.error)
            throw new Error(response.error)
        }

        yield put(postActions.GetPostSuccess(response))

    } catch (error) {
        yield put(postActions.GetPostError(error as string))
    }
}