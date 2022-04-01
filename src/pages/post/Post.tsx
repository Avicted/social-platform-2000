import { IPost } from '../../models/IPost'

interface PostProps {
    post: IPost
}

export const Post: React.FunctionComponent<PostProps> = ({ post }) => {
    const { title, content } = post

    return (
        <div>
            <h1>{title}</h1>
            <p>{content}</p>
        </div>
    )
}
