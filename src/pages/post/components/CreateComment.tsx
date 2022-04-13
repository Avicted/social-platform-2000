import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { ICreateCommentDto } from '../../../models/IComment'
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
            postId: postId,
            parentCommentId: parentCommentId,
            authorName: '',
            comment: '',
        },
    })

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

    return (
        <div className="pl-3 pr-3 pt-2 pb-2 rounded-md border">
            <p className="font-md mb-2 font-bold text-gray-700">Comment</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12">
                    <div className="col-span-7">
                        <label htmlFor="username" className="block text-xs font-medium text-gray-700">
                            Username
                        </label>
                        <div className="mt-1 col-span-5">
                            <input
                                {...register('authorName', {
                                    required: 'Username is required',
                                    maxLength: {
                                        value: 16,
                                        message: 'Username max length is 16',
                                    },
                                })}
                                type="text"
                                name="authorName"
                                id="authorName"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                            {errors.authorName && (
                                <p className="text-xs text-red-400 font-bold mt-1 font-mono">
                                    {errors.authorName.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="mt-4 col-span-12">
                        <label htmlFor="comment" className="block text-xs font-medium text-gray-700">
                            Add your comment
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
