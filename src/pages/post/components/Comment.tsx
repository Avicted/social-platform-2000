import { formatDistance } from 'date-fns'
import { useState } from 'react'
import { IComment } from '../../../models/IComment'
import { CreateComment } from './CreateComment'

interface CommentProps {
    comment: IComment
    parentsCount: number
    postId: number
    parentCommentId?: number
}

export const Comment: React.FunctionComponent<CommentProps> = ({ comment, parentsCount, postId, parentCommentId }) => {
    const [showCreateNewComment, setShowCreateNewComment] = useState<boolean>(false)

    return (
        <div className="mb-1" style={{ paddingLeft: parentsCount * 16 }}>
            <div className="border border-gray-200 pl-3 pr-3 pt-2 pb-2 rounded-md">
                <h4 className="text-sm font-bold text-blue-400">
                    {comment.authorName}
                    <p className="ml-3 inline-flex font-medium text-gray-400 text-xs">
                        {formatDistance(new Date(comment.createdDate), new Date(), {
                            includeSeconds: true,
                            addSuffix: true,
                        })}
                    </p>
                </h4>
                <p className="mt-1 mb-2 text-sm">{comment.content}</p>
                <button
                    type="button"
                    onClick={() => setShowCreateNewComment(!showCreateNewComment)}
                    className="inline-flex items-center text-xs font-medium rounded text-gray-500 bg-transparent hover:text-blue-500 hover:underline"
                >
                    reply
                </button>
                {showCreateNewComment && (
                    <div className="mt-4 grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-6">
                            <CreateComment
                                showByDefault={showCreateNewComment}
                                postId={postId}
                                parentCommentId={parentCommentId}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
