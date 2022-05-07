import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { IRegisterRequest } from '../../models/IRegisterRequest'
import { registerActions } from './actions/RegisterActions'

interface RegisterProps {}

type FormData = {
    username: string
    password: string
}

export const Register: React.FunctionComponent<RegisterProps> = ({}) => {
    const dispatch = useDispatch()
    const isLoading: boolean = useSelector((state: AppState) => state.register.isLoading)
    const error: string | undefined = useSelector((state: AppState) => state.register.error)

    const {
        handleSubmit,
        register,
        formState: { errors, isValid },
    } = useForm<FormData>({
        mode: 'all',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldFocusError: true,
        shouldUnregister: false,
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const onSubmit = (registerRequest: FormData) => {
        const { username, password } = registerRequest

        const data: IRegisterRequest = {
            username,
            password,
        }

        dispatch(registerActions.Register(data))
    }

    if (error && error.length > 0) {
        return <h1>Error: </h1>
    }

    return (
        <>
            {isLoading && <div className="Loading">LOADING..</div>}
            <div className="mb-8 pb-5 pt-12 border-b border-gray-200">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">Register</h3>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-8 grid gap-2 grid-cols-12">
                        <div className="col-start-4 col-span-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Username
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('username', {
                                        required: 'Username is required',
                                    })}
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.username && (
                                    <p className="text-xs text-red-400 font-bold mt-1 font-mono">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-start-4 col-span-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register('password', {
                                        required: 'Password is required',
                                    })}
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                                {errors.password && (
                                    <p className="text-xs text-red-400 font-bold mt-1 font-mono">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-start-4 col-span-6">
                            <button
                                type="submit"
                                disabled={!isValid || isLoading}
                                className="disabled:bg-gray-400 mt-8 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
