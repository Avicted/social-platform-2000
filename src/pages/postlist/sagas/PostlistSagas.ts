import { call, delay, put, takeLatest, takeLeading } from 'redux-saga/effects'
import { ForumApi } from '../../../api/ForumApi'
import { IApiResponse } from '../../../models/IApiResponse'
import { ICategory } from '../../../models/ICategory'
import { IPost } from '../../../models/IPost'
import { IPostQuery } from '../../../models/IPostQuery'
import { CreatePost, GetPosts, postlistActions, PostlistTypes } from '../actions/PostlistActions'

const forumApi = new ForumApi()

// Watcher saga
export function* getCategoryNameSaga() {
    yield takeLatest(PostlistTypes.GetPosts, getCategoryNameFlow)
}

// Worker saga
function* getCategoryNameFlow(action: GetPosts) {
    try {
        const response: IApiResponse<ICategory> = yield call(forumApi.getCategoryById, action.categoryId)
        console.log(response)

        if (response.isError) {
            console.error(response.responseException?.exceptionMessage)

            // @Todo(Avic): Fixme -> as unknown as string
            throw new Error(response.responseException?.exceptionMessage as unknown as string)
        }

        yield put(postlistActions.GetCategoryTitleSuccess(response.result))

        // Once we have the posts
    } catch (error) {
        yield put(postlistActions.GetPostsError(error as string))
    }
}

// Watcher saga
export function* getPostsSaga() {
    yield takeLatest(PostlistTypes.GetPosts, getPostsFlow)
}

// Worker saga
function* getPostsFlow(action: GetPosts) {
    // Get the posts in this action.categoryId
    try {
        const response: IApiResponse<IPost[]> = yield call(forumApi.getPosts, action.categoryId, action.query)
        console.log(response)

        if (response.isError) {
            console.error(response.responseException?.exceptionMessage)

            // @Todo(Avic): Fixme -> as unknown as string
            throw new Error(response.responseException?.exceptionMessage as unknown as string)
        }

        yield put(postlistActions.GetPostsSuccess(response))

        // Once we have the posts
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
        const response: IApiResponse<IPost[]> = yield call(forumApi.createPost, action.post)
        console.log(response)

        if (response.isError) {
            console.error(response.responseException?.exceptionMessage)

            // @Todo(Avic): Fixme -> as unknown as string
            throw new Error(response.responseException?.exceptionMessage as unknown as string)
        }

        yield put(postlistActions.GetPostsSuccess(response))

        yield put(postlistActions.ToggleCreatePostDialog())

        const query: IPostQuery = {
            pageNumber: 1,
            pageSize: 10,
        }

        yield put(postlistActions.GetPosts(action.post.categoryId, query))
    } catch (error) {
        yield put(postlistActions.CreatePostError(error as string))
    }
}
