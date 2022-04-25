import { Action } from 'redux'
import { ILoginRequest } from '../../../models/ILoginRequest'
import { IUser } from '../../../models/IUser'

export enum LoginTypes {
    'Login' = 'Login/Login',
    'LoginSuccessful' = 'Login/LoginSuccessful',
    'LoginError' = 'Login/LoginError',

    'Logout' = 'Login/Logout',
}

export interface Login extends Action {
    type: LoginTypes.Login
    payload: ILoginRequest
}

export interface LoginSuccessful extends Action {
    type: LoginTypes.LoginSuccessful
    data: IUser
}

export interface LoginError extends Action {
    type: LoginTypes.LoginError
    error: string
}

export interface Logout extends Action {
    type: LoginTypes.Logout
}

export const loginActions = {
    Login: (payload: ILoginRequest): Login => ({
        type: LoginTypes.Login,
        payload,
    }),
    LoginSuccessful: (data: any): LoginSuccessful => ({
        type: LoginTypes.LoginSuccessful,
        data,
    }),
    LoginError: (error: string): LoginError => ({
        type: LoginTypes.LoginError,
        error,
    }),
    Logout: (): Logout => ({
        type: LoginTypes.Logout,
    }),
}

export type LoginActions = Login | LoginSuccessful | LoginError | Logout
