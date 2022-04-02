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
    // yield delay(2000)

    try {
        const response: IApiResponse<IPost> = yield call(forumApi.getPost, action.postId)
        console.log(response)

        if (response.isError) {
            console.error(response.responseException?.exceptionMessage)

            // @Todo(Avic): Fixme -> as unknown as string
            throw new Error(response.responseException?.exceptionMessage as unknown as string)
        }

        yield put(postActions.GetPostSuccess(response))

    } catch (error) {
        yield put(postActions.GetPostError(error as string))
    }
}