import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { IPost } from '../../models/IPost'
import { postActions } from './actions/PostActions'
import { Comments } from './components/Comments'
import { useParams } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import { IComment } from '../../models/IComment'

interface PostProps {}

export const Post: React.FunctionComponent<PostProps> = () => {
    const dispatch = useDispatch()
    const post: IPost | undefined = useSelector((state: AppState) => state.posts.post)
    const error: string | undefined = useSelector((state: AppState) => state.posts.error)
    const isLoading: boolean = useSelector((state: AppState) => state.posts.isLoading)
    const isLoadingComments: boolean = useSelector((state: AppState) => state.posts.isLoadingComments)
    const comments: IComment[] | undefined = useSelector((state: AppState) => state.posts.comments)
    let { postId } = useParams() // Unpacking and retrieve id

    // Once the component loads -> run once
    useEffect(() => {
        if (postId) {
            dispatch(postActions.GetPost(parseInt(postId)))
            dispatch(postActions.GetCommentsInPost(parseInt(postId)))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full mt-24">
                <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                    <span className="visually-hidden">JavaScript...</span>
                </div>
            </div>
        )
    }

    if (error || post === undefined) {
        return <h1>Error: {error}</h1>
    }

    return (
        <>
            <div className="mb-8 pb-5 pt-12 border-b border-gray-200">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">{post.title}</h3>
                <div className="text-sm text-gray-500 mt-2">
                    <p>
                        Posted{' '}
                        {formatDistance(new Date(post.createdDate), new Date(), {
                            includeSeconds: true,
                            addSuffix: true,
                        })}
                    </p>
                </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:p-6">
                    <p>{post.content}</p>

                    <Comments comments={comments} isLoadingComments={isLoadingComments} postId={post.postId} />
                </div>
            </div>
        </>
    )
}
