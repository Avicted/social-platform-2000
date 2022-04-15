import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import { NavLink } from 'react-router-dom'
import { ICategory } from '../../models/ICategory'
import { categoryListActions } from './actions/CategoryListActions'
import { ICategoryQuery } from '../../models/ICategoryQuery'
import { Pagination } from '../../shared/components/Pagination'

interface CategoryListProps {}

export const CategoryList: React.FunctionComponent<CategoryListProps> = () => {
    const dispatch = useDispatch()
    const categories: ICategory[] = useSelector((state: AppState) => state.categoryList.categories)
    const totalItemsCount: number | undefined = useSelector((state: AppState) => state.categoryList.totalItemsCount)
    const totalPages: number | undefined = useSelector((state: AppState) => state.categoryList.totalPages)
    const error: string | undefined = useSelector((state: AppState) => state.postList.error)
    const isLoading: boolean = useSelector((state: AppState) => state.postList.isLoading)

    // pageSize:   number
    // pageNumber: number
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)

    // Once the component loads -> run once
    useEffect(() => {
        const query: ICategoryQuery = {
            pageNumber: pageNumber,
            pageSize: pageSize,
        }

        dispatch(categoryListActions.GetCategories(query))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber])

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

            <Pagination
                pageNumber={pageNumber}
                pageSize={pageSize}
                totalPages={totalPages}
                totalItemsCount={totalItemsCount}
                onNextPage={() => setPageNumber(pageNumber + 1)}
                onPreviousPage={() => setPageNumber(pageNumber - 1)}
            />
        </>
    )
}
