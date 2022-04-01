import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { IPost } from '../../models/IPost'
import { postActions } from './actions/PostActions'

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

    if (error || post === undefined) {
        return <h1>Error: {error}</h1>
    }

    if (isLoading) {
        return <h1>Loading posts...</h1>
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    )
}
