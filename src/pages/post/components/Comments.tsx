import { IComment } from '../../../models/IComment'
import { Comment } from './Comment'
import { CreateComment } from './CreateComment'

interface CommentsProps {
    comments: IComment[] | undefined
    isLoadingComments: boolean
    postId: number
}

export const Comments: React.FunctionComponent<CommentsProps> = ({ comments, isLoadingComments, postId }) => {
    const header = (): JSX.Element => (
        <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex items-center justify-between">
                <span className="pr-3 bg-white text-lg font-medium text-gray-500">Comments</span>
            </div>
        </div>
    )

    if (isLoadingComments) {
        return (
            <div className="flex justify-center items-center h-full mt-24">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">Loading Comments JavaScript...</span>
                </div>
            </div>
        )
    }

    if (!comments) {
        return (
            <div className="mt-24">
                {header()}
                <p className="text-gray-700">No comments in this post</p>
            </div>
        )
    }

    const getIntendation = (comment: IComment, count: number = 0): number => {
        // There are no parent comments, this is a root comment
        if (!comment.parentCommentId) return count

        // How many parents does this comment have?
        for (let i = 0; i < comments.length; i++) {
            const element = comments[i]

            if (!element) continue

            if (element.commentId === comment.parentCommentId) {
                const parent = element
                count += 1

                if (parent.parentCommentId) {
                    return getIntendation(parent, count)
                }
            }
        }

        return count
    }

    // @Note(Avic): The comments nesting logic is handled in the frontend for now...
    // Seems to work fine
    const renderComments = (c: IComment[]): JSX.Element => {
        return (
            <>
                {c.map((comment, index) => {
                    const parentsCount: number = getIntendation(comment)
                    const children: IComment[] = comments.filter((c) => c.parentCommentId === comment.commentId)

                    return (
                        <div className="flex flex-col" key={index}>
                            <Comment comment={comment} parentsCount={parentsCount} postId={postId} />

                            <div>{children.length > 0 && renderComments(children)}</div>
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div className="mt-24">
            {header()}

            <div className="flex flex-col">
                {/* Pass the root comments that have no parent */}
                {renderComments(comments.filter((c) => c.parentCommentId === undefined))}
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-6 mt-8">
                    <CreateComment postId={postId} />
                </div>
            </div>
        </div>
    )
}
