import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { IPost } from '../../models/IPost'
import { postlistActions } from './actions/PostlistActions'
import { ChevronRightIcon } from '@heroicons/react/solid'
import { NavLink, useParams } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import { CreatePostDialog } from './components/CreatePostDialog'
import { Pagination } from '../../shared/components/Pagination'
import { IPostQuery } from '../../models/IPostQuery'

interface PostlistProps {}

export const Postlist: React.FunctionComponent<PostlistProps> = () => {
    const dispatch = useDispatch()
    const posts: IPost[] = useSelector((state: AppState) => state.postList.posts)
    const totalItemsCount: number | undefined = useSelector((state: AppState) => state.postList.totalItemsCount)
    const totalPages: number | undefined = useSelector((state: AppState) => state.postList.totalPages)
    const error: string | undefined = useSelector((state: AppState) => state.postList.error)
    const isLoading: boolean = useSelector((state: AppState) => state.postList.isLoading)

    let { categoryId } = useParams() // Unpacking and retrieve id

    const [pageNumber, setPageNumber] = useState<number>(1)
    const pageSize: number = 10

    // Once the component loads -> run once
    useEffect(() => {
        if (categoryId) {
            const query: IPostQuery = {
                pageNumber: pageNumber,
                pageSize: pageSize,
            }

            dispatch(postlistActions.GetPosts(parseInt(categoryId), query))
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

    if (error) {
        return <h1>Error: {error}</h1>
    }

    if (!posts) {
        return (
            <>
                {categoryId && <CreatePostDialog categoryId={parseInt(categoryId)} />}

                <div className="mt-40 text-center">
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No Posts in this category</h3>
                    <p className="mt-1 text-sm text-gray-500">Would you like to be the first to post here?</p>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => dispatch(postlistActions.ToggleCreatePostDialog())}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create post
                        </button>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {categoryId && <CreatePostDialog categoryId={parseInt(categoryId)} />}

            <div className="mb-8  pb-5 pt-12 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">Forum posts</h3>
                <div className="mt-3 flex sm:mt-0 sm:ml-4">
                    <button
                        type="button"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        onClick={() => dispatch(postlistActions.ToggleCreatePostDialog())}
                    >
                        Create post
                    </button>
                </div>
            </div>

            {posts.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {posts.map((post, index) => (
                            <li key={post.postId}>
                                <NavLink
                                    to={`/categories/${categoryId}/${post.postId}`}
                                    className="block hover:bg-gray-50"
                                >
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="min-w-0 flex-1 flex items-center">
                                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                                <div>
                                                    <p className="text-sm font-medium text-indigo-600 truncate">
                                                        {post.title}
                                                    </p>
                                                </div>
                                                <div className="text-right hidden md:block">
                                                    <p className="text-sm text-gray-900">
                                                        Posted{' '}
                                                        {formatDistance(new Date(post.createdDate), new Date(), {
                                                            includeSeconds: true,
                                                            addSuffix: true,
                                                        })}
                                                    </p>
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
                    <Pagination
                        pageNumber={pageNumber}
                        pageSize={pageSize}
                        totalPages={totalPages}
                        totalItemsCount={totalItemsCount}
                        onNextPage={() => setPageNumber(pageNumber + 1)}
                        onPreviousPage={() => setPageNumber(pageNumber - 1)}
                    />
                </div>
            ) : (
                <div>
                    <p>No posts found</p>
                </div>
            )}
        </>
    )
}
