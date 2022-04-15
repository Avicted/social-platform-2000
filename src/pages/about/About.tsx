interface AboutProps {}

export const About: React.FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div className="mb-8 pb-5 pt-12 border-b border-gray-200">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">About</h3>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:p-6">
                    <div className="relative mb-2">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-start">
                            <span className="pr-3 bg-white text-lg font-medium text-gray-900">Frontend</span>
                        </div>
                    </div>
                    <p className="">
                        This forum has separate front and back -end. The frontend is React (CRA) Create react app with
                        TypeScript. Redux (with immer) is used for the datastore. All buisness logic is written into
                        generator functions using Redux Saga. This makes it easy to write buissness logic. TailwindCSS
                        is used as the frontend library.
                    </p>

                    <div className="relative mt-12 mb-2">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-start">
                            <span className="pr-3 bg-white text-lg font-medium text-gray-900">Backend</span>
                        </div>
                    </div>
                    <p className="">
                        The backend is written in C# Dotnet Core using entity framework. The repository pattern has been
                        coupled with a simplified clean architecture pattern.
                    </p>
                </div>
            </div>
        </>
    )
}
