import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { ForumApi } from '../../../api/ForumApi'
import { IApiResponse } from '../../../models/IApiResponse'
import { IUser } from '../../../models/IUser'
import { loginActions } from '../../login/actions/LoginActions'
import { Register, RegisterTypes } from '../actions/RegisterActions'

const forumApi = new ForumApi()

// Watcher saga
export function* registerUserSaga() {
    yield takeLatest(RegisterTypes.Register, registerUserFlow)
}

// Worker saga
function* registerUserFlow(action: Register) {
    // Simulate API delay
    yield delay(2000)

    try {
        const response: IApiResponse<IUser> = yield call(forumApi.register, action.payload)
        console.log(response)

        if (response.isError) {
            console.error(response.message)
            throw new Error(response.message)
        }

        yield put(loginActions.LoginSuccessful(response.result))

        window.location.pathname = '/login'
    } catch (error) {
        yield put(loginActions.LoginError(error as string))
    }
}
