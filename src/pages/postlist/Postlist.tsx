import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { IPost } from '../../models/IPost'
import { postlistActions } from './actions/PostlistActions'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { NavLink } from 'react-router-dom'

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

    if (isLoading) {
        return <h1>Loading posts...</h1>
    }

    if (error) {
        return <h1>Error: {error}</h1>
    }

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {posts.map((post, index) => (
                    <li key={post.id}>
                        <NavLink to={`/forum/${post.id}`} className="block hover:bg-gray-50">
                            <div className="flex items-center px-4 py-4 sm:px-6">
                                <div className="min-w-0 flex-1 flex items-center">
                                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600 truncate">{post.title}</p>
                                        </div>
                                        <div className="hidden md:block">
                                            <div>
                                                <p className="text-sm text-gray-900">
                                                    Posted on{' '}
                                                    <time dateTime={new Date().toString()}>
                                                        {new Date().toISOString()}
                                                    </time>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                </div>
                            </div>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}
