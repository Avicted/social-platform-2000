import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { AppState } from '../../../framework/store/rootReducer'
import { ICreateCommentDto } from '../../../models/IComment'
import { IUser } from '../../../models/IUser'
import { postActions } from '../actions/PostActions'

interface CreateCommentProps {
    showByDefault?: boolean
    postId: number
    parentCommentId?: number
}

type FormData = {
    postId: number
    parentCommentId?: number
    authorName: string
    comment: string
}

export const CreateComment: React.FunctionComponent<CreateCommentProps> = ({
    showByDefault,
    postId,
    parentCommentId,
}) => {
    const dispatch = useDispatch()
    const [show, setShow] = useState<boolean>(showByDefault || false)
    const user: IUser | undefined = useSelector((state: AppState) => state.login.user)

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isValid },
    } = useForm<FormData>({
        mode: 'all',
        reValidateMode: 'onChange',
        criteriaMode: 'all',
        shouldFocusError: true,
        shouldUnregister: false,
        defaultValues: {
            postId: postId,
            parentCommentId: parentCommentId,
            authorName: '',
            comment: '',
        },
    })

    useEffect(() => {
        if (user) {
            setValue('authorName', user.username, { shouldValidate: true })
        }
    }, [user])

    const onSubmit = (newComment: FormData) => {
        console.log({ info: '[CreateComment]: onSubmit', newComment })
        const { authorName, comment: content, postId, parentCommentId } = newComment

        const data: ICreateCommentDto = {
            authorName,
            postId,
            parentCommentId,
            content,
        }

        dispatch(postActions.PostComment(data))
    }

    if (showByDefault === false) {
        return null
    }

    if (!show && !showByDefault) {
        return (
            <button
                type="button"
                onClick={() => setShow(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Comment
            </button>
        )
    }

    if (!user) {
        return (
            <div className="pl-3 pr-3 pt-2 pb-2 rounded-md border">
                <p className="font-md mb-2 mt-2 font-bold text-gray-600">
                    You need to{' '}
                    <NavLink className="inline-flex text-pink-500 hover:text-pink-600" to={'/login'}>
                        Login
                    </NavLink>{' '}
                    to comment
                </p>
            </div>
        )
    }

    return (
        <div className="pl-3 pr-3 pt-2 pb-2 rounded-md border">
            <p className="font-md mb-2 font-bold text-gray-700">Comment</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12">
                    <div className="mt-4 col-span-12">
                        <label htmlFor="comment" className="block text-xs font-medium text-gray-700">
                            Add your comment as <span className="text-purple-500 font-bold">{user?.username}</span>
                        </label>
                        <div className="mt-1">
                            <textarea
                                {...register('comment', {
                                    required: 'Comment is required',
                                    maxLength: {
                                        value: 10000,
                                        message: 'Comment max length is 10000',
                                    },
                                })}
                                rows={4}
                                name="comment"
                                id="comment"
                                className="p-2 border shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                defaultValue={''}
                            />
                            {errors.comment && (
                                <p className="text-xs text-red-400 font-bold mt-1 font-mono">
                                    {errors.comment.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="col-span-12 mt-2 flex justify-end">
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="disabled:bg-gray-400 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Post
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
