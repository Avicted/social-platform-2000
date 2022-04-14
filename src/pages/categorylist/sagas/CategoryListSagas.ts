import { call, put, takeLatest } from 'redux-saga/effects'
import { ForumApi } from '../../../api/ForumApi'
import { IApiResponse } from '../../../models/IApiResponse'
import { ICategory } from '../../../models/ICategory'
import { categoryListActions, CategoryListTypes, GetCategories } from '../actions/CategoryListActions'

const forumApi = new ForumApi()

// Watcher saga
export function* getCategoriesSaga() {
    yield takeLatest(CategoryListTypes.GetCategories, getCategoriesFlow)
}

// Worker saga
function* getCategoriesFlow(action: GetCategories) {
    try {
        // Simulate API delay
        // yield delay(2000)
        const response: IApiResponse<ICategory[]> = yield call(forumApi.getCategories, action.query)
        console.log(response)

        if (response.isError) {
            console.error(response.responseException?.exceptionMessage)

            // @Todo(Avic): Fixme -> as unknown as string
            throw new Error(response.responseException?.exceptionMessage as unknown as string)
        }

        yield put(categoryListActions.GetCategoriesSuccess(response))
    } catch (error) {
        yield put(categoryListActions.GetCategoriesError(error as string))
    }
}
