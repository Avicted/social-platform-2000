import { useState } from 'react'

interface CreateCommentProps {
    showByDefault?: boolean
    postId: number
    parentCommentId?: number
}

export const CreateComment: React.FunctionComponent<CreateCommentProps> = ({ showByDefault }) => {
    const [show, setShow] = useState<boolean>(showByDefault || false)

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

            <div className="grid grid-cols-12">
                <div className="col-span-7">
                    <label htmlFor="username" className="block text-xs font-medium text-gray-700">
                        Username
                    </label>
                    <div className="mt-1 col-span-5">
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                    </div>
                </div>
                <div className="mt-4 col-span-12">
                    <label htmlFor="comment" className="block text-xs font-medium text-gray-700">
                        Add your comment
                    </label>
                    <div className="mt-1">
                        <textarea
                            rows={4}
                            name="comment"
                            id="comment"
                            className="p-2 border shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            defaultValue={''}
                        />
                    </div>
                </div>
                <div className="col-span-12 mt-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={true}
                        className="disabled:bg-gray-400 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Post
                    </button>
                </div>
            </div>
        </div>
    )
}
