import { call, delay, put, takeLatest } from 'redux-saga/effects'
import { ForumApi } from '../../../api/ForumApi'
import { IApiResponse } from '../../../models/IApiResponse'
import { IUser } from '../../../models/IUser'
import { Login, loginActions, LoginTypes, Logout } from '../actions/LoginActions'

const forumApi = new ForumApi()

// Watcher saga
export function* loginSaga() {
    yield takeLatest(LoginTypes.Login, loginFlow)
}
// Worker saga
function* loginFlow(action: Login) {
    // Simulate API delay
    // yield delay(2000)

    try {
        const response: IApiResponse<IUser> = yield call(forumApi.login, action.payload)
        console.log(response)

        if (response.isError) {
            console.error(response.message)
            throw new Error(response.message)
        }

        yield put(loginActions.LoginSuccessful(response.result))

        window.location.pathname = '/profile'
    } catch (error) {
        yield put(loginActions.LoginError(error as string))
    }
}

// Watcher saga
export function* logoutSaga() {
    yield takeLatest(LoginTypes.Logout, logoutFlow)
}

function* logoutFlow(action: Logout) {
    // Logout buissness logic
}
