import { Action } from 'redux'
import { IRegisterRequest } from '../../../models/IRegisterRequest'

export enum RegisterTypes {
    'Register' = 'Register/Register',
    'RegisterSuccessful' = 'Register/RegisterSuccessful',
    'RegisterError' = 'Register/RegisterError',
}

export interface Register extends Action {
    type: RegisterTypes.Register
    payload: IRegisterRequest
}

export interface RegisterSuccessful extends Action {
    type: RegisterTypes.RegisterSuccessful
}

export interface RegisterError extends Action {
    type: RegisterTypes.RegisterError
    error: string
}

export const registerActions = {
    Register: (payload: IRegisterRequest): Register => ({
        type: RegisterTypes.Register,
        payload,
    }),
    RegisterSuccess: (): RegisterSuccessful => ({
        type: RegisterTypes.RegisterSuccessful,
    }),
    RegisterError: (error: string): RegisterError => ({
        type: RegisterTypes.RegisterError,
        error,
    }),
}

export type RegisterActions = Register | RegisterSuccessful | RegisterError
