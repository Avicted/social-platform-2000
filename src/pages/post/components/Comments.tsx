import { formatDistance } from 'date-fns'
import { useState } from 'react'
import { IComment } from '../../../models/IComment'

interface CommentsProps {
    comments: IComment[] | undefined
    isLoadingComments: boolean
}

export const Comments: React.FunctionComponent<CommentsProps> = ({ comments, isLoadingComments }) => {
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

    const renderComment = (comment: IComment, parentsCount: number): JSX.Element => (
        <div className="mb-2" style={{ paddingLeft: parentsCount * 100 }}>
            <div className="border border-gray-200 pl-3 pr-3 pt-2 pb-2 rounded-lg">
                <h4 className="text-lg font-bold text-blue-400">{comment.authorName}</h4>
                <p className="mt-1">{comment.content}</p>

                <p className="mt-3 text-gray-400 text-xs">
                    {formatDistance(new Date(comment.createdDate), new Date(), {
                        includeSeconds: true,
                        addSuffix: true,
                    })}
                </p>
            </div>
        </div>
    )

    // @Continue
    // @Todo(Avic): There is something odd happening here...
    // The child comments only intendate 2 levels, not 3 or 4 etc... ???
    const getIntendation = (commentParentId?: number, count: number = 0): number => {
        let id: number | undefined = commentParentId

        // There are no parent comments, this is a root comment
        if (!id) return 0

        // How many parents does this comment have?
        for (let i = 0; i < comments.length; i++) {
            const element = comments[i]

            if (element.commentId === id) {
                count++
                id = element.parentCommentId

                if (id) {
                    getIntendation(id, count)
                    count++
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
                    const parentsCount: number = getIntendation(comment.parentCommentId)
                    console.log({
                        commentId: comment.commentId,
                        parentsCount,
                    })
                    const children: IComment[] = comments.filter((c) => c.parentCommentId === comment.commentId)

                    return (
                        <div key={index}>
                            {renderComment(comment, parentsCount)}
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
        </div>
    )
}
