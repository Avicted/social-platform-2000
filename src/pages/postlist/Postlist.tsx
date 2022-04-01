import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { IPost } from '../../models/IPost'
import { postlistActions } from './actions/PostlistActions'

interface PostlistProps {}

export const Postlist: React.FunctionComponent<PostlistProps> = () => {
    const dispatch = useDispatch()
    const posts: IPost[] = useSelector((state: AppState) => state.postlist.posts)
    const error: string | undefined = useSelector((state: AppState) => state.postlist.error)
    const isLoading: boolean = useSelector((state: AppState) => state.postlist.isLoading)

    // Once the component loads -> run once
    useEffect(() => {
        dispatch(postlistActions.GetPosts())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (error) {
        return <h1>Error: {error}</h1>
    }

    if (isLoading) {
        return <h1>Loading posts...</h1>
    }

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index}>
                    <p>{post.title}</p>
                </div>
            ))}
        </div>
    )
}
