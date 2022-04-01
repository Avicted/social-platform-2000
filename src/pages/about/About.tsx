interface AboutProps {}

export const About: React.FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div className="mb-8 pb-5 pt-12 border-b border-gray-200">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">About</h3>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:p-6">
                    <div>This is the about page</div>
                </div>
            </div>
        </>
    )
}
