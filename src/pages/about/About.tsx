import { NavLink } from 'react-router-dom'

interface AboutProps {}

export const About: React.FunctionComponent<AboutProps> = () => {
    return (
        <>
            <div>This is the about page</div>

            <NavLink to={'/forum'}>
                <button
                    type="button"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    View Forum
                </button>
            </NavLink>
        </>
    )
}
