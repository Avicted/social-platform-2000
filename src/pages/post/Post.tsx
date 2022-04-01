import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { IPost } from '../../models/IPost'
import { postActions } from './actions/PostActions'
import { Comments } from './components/Comments'

interface PostProps {}

export const Post: React.FunctionComponent<PostProps> = () => {
    const dispatch = useDispatch()
    const post: IPost | undefined = useSelector((state: AppState) => state.post.post)
    const error: string | undefined = useSelector((state: AppState) => state.post.error)
    const isLoading: boolean = useSelector((state: AppState) => state.post.isLoading)

    // Once the component loads -> run once
    useEffect(() => {
        dispatch(postActions.GetPost())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (isLoading) {
        return <h1>Loading post...</h1>
    }

    if (error || post === undefined) {
        return <h1>Error: {error}</h1>
    }

    return (
        <div className="mt-12">
            <div className="pb-5 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">{post.title}</h3>
            </div>

            <div className="mt-8">
                <p>{post.content}</p>
            </div>

            <Comments />
        </div>
    )
}
