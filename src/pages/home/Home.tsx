interface HomeProps {}

export const Home: React.FunctionComponent<HomeProps> = ({}) => {
    return (
        <>
            <div className="mb-8 pb-5 pt-12 border-b border-gray-200">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">Home</h3>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200 p-8">Welcome home</div>
        </>
    )
}
