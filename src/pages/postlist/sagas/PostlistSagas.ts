import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { ForumApi } from "../../../api/ForumApi";
import { IApiResponse } from '../../../models/IApiResponse';
import { IPost } from '../../../models/IPost';
import { CreatePost, GetPosts, postlistActions, PostlistTypes } from "../actions/PostlistActions";


const forumApi = new ForumApi()

// Watcher saga
export function* getPostsSaga() {
    yield takeLatest(PostlistTypes.GetPosts, getPostsFlow)
}

// Worker saga
function* getPostsFlow(action: GetPosts) {
    // Simulate API delay
    // yield delay(2000)

    try {
        const response: IApiResponse<IPost[]> = yield call(forumApi.getPosts)
        console.log(response)

        if (response.isError) {
            console.error(response.responseException?.exceptionMessage)

            // @Todo(Avic): Fixme -> as unknown as string
            throw new Error(response.responseException?.exceptionMessage as unknown as string)
        }

        yield put(postlistActions.GetPostsSuccess(response))

    } catch (error) {
        yield put(postlistActions.GetPostsError(error as string))
    }
}


// Watcher saga
export function* createPostSaga() {
    yield takeLatest(PostlistTypes.CreatePost, createPostFlow)
}

// Worker saga
function* createPostFlow(action: CreatePost) {
    try {
        // Simulate API delay
        // yield delay(2000)
        const response: IApiResponse<IPost[]> = yield call(forumApi.createPost, action.post)
        console.log(response)

        if (response.isError) {
            console.error(response.responseException?.exceptionMessage)

            // @Todo(Avic): Fixme -> as unknown as string
            throw new Error(response.responseException?.exceptionMessage as unknown as string)
        }

        yield put(postlistActions.GetPostsSuccess(response))

        yield put(postlistActions.ToggleCreatePostDialog())

        yield put(postlistActions.GetPosts())

    } catch (error) {

    }
}