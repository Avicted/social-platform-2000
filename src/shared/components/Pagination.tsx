interface PaginationProps {
    pageNumber: number
    pageSize: number
    totalPages: number | undefined
    totalItemsCount: number | undefined
    onNextPage: (page: number) => void
    onPreviousPage: (page: number) => void
}

export const Pagination: React.FunctionComponent<PaginationProps> = ({
    pageNumber,
    pageSize,
    totalPages,
    totalItemsCount,
    onNextPage,
    onPreviousPage,
}) => {
    if (!totalItemsCount || !totalPages) {
        return null
    }

    return (
        <nav
            className="rounded-b-md shadow-sm bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
            aria-label="Pagination"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{Math.ceil(pageNumber * pageSize - pageSize) + 1}</span> to{' '}
                    <span className="font-medium">
                        {pageNumber * pageSize - 1 === totalItemsCount ? totalItemsCount : pageNumber * pageSize}
                    </span>{' '}
                    of <span className="font-medium">{totalItemsCount}</span> results
                </p>
            </div>
            <div className="flex-1 flex justify-between sm:justify-end">
                <button
                    disabled={pageNumber <= 1 ? true : false}
                    onClick={() => onPreviousPage(pageNumber - 1)}
                    className="disabled:bg-gray-100 disabled:text-gray-400 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Previous
                </button>
                <button
                    disabled={pageNumber === totalPages ? true : false}
                    onClick={() => onNextPage(pageNumber + 1)}
                    className="disabled:bg-gray-100 disabled:text-gray-400 ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                    Next
                </button>
            </div>
        </nav>
    )
}
