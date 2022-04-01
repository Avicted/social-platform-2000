import { Post } from '../post/Post'

interface PostListProps {}

export const PostList: React.FunctionComponent<PostListProps> = ({ children }) => {
    return (
        <>
            <Post />
            <Post />
            <Post />
            <Post />
        </>
    )
}
