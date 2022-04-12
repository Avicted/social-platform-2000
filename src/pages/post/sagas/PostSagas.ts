import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { ForumApi } from '../../../api/ForumApi'
import { IApiResponse } from '../../../models/IApiResponse'
import { IComment } from '../../../models/IComment'
import { IPost } from '../../../models/IPost'
import { GetCommentsInPost, GetPost, postActions, PostTypes } from '../../post/actions/PostActions'

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
            console.error(response.message)
            throw new Error(response.message)
        }

        yield put(postActions.GetPostSuccess(response))
    } catch (error) {
        yield put(postActions.GetPostError(error as string))
    }
}

// Watcher saga
export function* getCommentsSaga() {
    yield takeLatest(PostTypes.GetCommentsInPost, getCommentsFlow)
}

// Worker saga
function* getCommentsFlow(action: GetCommentsInPost) {
    // Simulate API delay
    // yield delay(2000)

    try {
        const response: IApiResponse<IComment[]> = yield call(forumApi.getCommentsInPost, action.postId)
        console.log(response)

        if (response.isError) {
            console.error(response.message)
            throw new Error(response.message)
        }

        yield put(postActions.GetCommentsInPostSuccess(response.result))
    } catch (error) {
        yield put(postActions.GetCommentsInPostError(error as string))
    }
}
