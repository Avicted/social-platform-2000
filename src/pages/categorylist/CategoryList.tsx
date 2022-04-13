import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { NavLink } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import { ICategory } from '../../models/ICategory'
import { postlistActions } from '../postlist/actions/PostlistActions'
import { categoryListActions } from './actions/CategoryListActions'

interface CategoryListProps {}

export const CategoryList: React.FunctionComponent<CategoryListProps> = () => {
    const dispatch = useDispatch()
    const categories: ICategory[] = useSelector((state: AppState) => state.categoryList.categories)
    const error: string | undefined = useSelector((state: AppState) => state.postList.error)
    const isLoading: boolean = useSelector((state: AppState) => state.postList.isLoading)

    // Once the component loads -> run once
    useEffect(() => {
        dispatch(categoryListActions.GetCategories())
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

    const paginationButtons = (): JSX.Element => (
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <a
                href="#"
                aria-current="page"
                className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
                1
            </a>
            <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
                2
            </a>
            <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
                3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
            </span>
            <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
                8
            </a>
            <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
                9
            </a>
            <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
                10
            </a>
            <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
        </nav>
    )

    return (
        <>
            <div className="mb-8  pb-5 pt-12 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">Forum Categories</h3>
            </div>

            {categories.length > 0 ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {categories.map((category, index) => (
                            <li key={category.categoryId}>
                                <NavLink to={`/categories/${category.categoryId}`} className="block hover:bg-gray-50">
                                    <div className="flex items-center px-4 py-4 sm:px-6">
                                        <div className="min-w-0 flex-1 flex items-center">
                                            <div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
                                                <div className="flex">
                                                    <div className="w-16 mr-3">
                                                        <span className="px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                                                            {category.postsCount}
                                                        </span>
                                                    </div>
                                                    <p className="flex text-sm font-medium text-indigo-600 truncate">
                                                        {category.title}
                                                    </p>
                                                </div>
                                                {/* <div className="text-right hidden md:block">
                                                    <div>
                                                        <p className="text-sm text-gray-900">
                                                            Posted{' '}
                                                            {formatDistance(
                                                                new Date(category.createdDate),
                                                                new Date(),
                                                                {
                                                                    includeSeconds: true,
                                                                    addSuffix: true,
                                                                }
                                                            )}
                                                        </p>
                                                    </div>
                                                </div> */}
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
            ) : (
                <div>
                    <p>No posts found</p>
                </div>
            )}

            {categories.length > 0 && (
                <div className="bg-white px-4 py-3 flex items-center justify-between border border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:hidden">
                        <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Previous
                        </a>
                        <a
                            href="#"
                            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Next
                        </a>
                    </div>
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">1</span> to{' '}
                                <span className="font-medium">10</span> of{' '}
                                <span className="font-medium">{categories.length}</span> results
                            </p>
                        </div>
                        <div>{paginationButtons()}</div>
                    </div>
                </div>
            )}
        </>
    )
}
