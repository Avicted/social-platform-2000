import { Disclosure } from '@headlessui/react'
import { SearchIcon } from '@heroicons/react/solid'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginActions } from '../../pages/login/actions/LoginActions'
import { AppState } from '../store/rootReducer'

interface NavigationItem {
    name: string
    link: string
    requireAuth: boolean
    hideToAuthenticatedUser?: boolean
    onClick: (...params: any) => void
}

const navigation: NavigationItem[] = [
    {
        name: 'Home',
        link: '/',
        requireAuth: false,
        onClick: () => {},
    },
    {
        name: 'About',
        link: '/about',
        requireAuth: false,
        onClick: () => {},
    },
    {
        name: 'Forum',
        link: '/categories',
        requireAuth: false,
        onClick: () => {},
    },
    {
        name: 'Login',
        link: '/login',
        hideToAuthenticatedUser: true,
        requireAuth: false,
        onClick: () => {},
    },
    {
        name: 'Register',
        link: '/register',
        hideToAuthenticatedUser: true,
        requireAuth: false,
        onClick: () => {},
    },
    {
        name: 'Logout',
        link: '/login',
        requireAuth: true,

        onClick: (dispatch) => {
            dispatch(loginActions.Logout())
        },
    },
    {
        name: 'Profile',
        link: '/profile',
        requireAuth: true,
        onClick: () => {},
    },
]

interface NavbarProps {}

export const Navbar: React.FunctionComponent<NavbarProps> = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoggedIn: boolean = useSelector((state: AppState) => state.login.user !== undefined)

    const renderNavItem = (item: NavigationItem): JSX.Element | null => {
        const navLink = (
            <NavLink
                key={item.name}
                className="flex px-4 py-2 text-base font-medium text-gray-500 hover:text-pink-600 "
                onClick={() => item.onClick(dispatch, navigate)}
                to={item.link}
            >
                {item.name}
            </NavLink>
        )

        if (item.requireAuth && isLoggedIn) {
            return navLink
        } else if (item.requireAuth && !isLoggedIn) {
            return null
        } else if (item.hideToAuthenticatedUser && isLoggedIn) return null

        return navLink
    }

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex items-center px-2 lg:px-0">
                                <div className="hidden lg:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item, index) => renderNavItem(item))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                                <div className="max-w-lg w-full lg:max-w-xs">
                                    <label htmlFor="search" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search"
                                            name="search"
                                            className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm"
                                            placeholder="Search"
                                            type="search"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:hidden">
                                {/* Mobile menu button */}
                                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                                    ) : (
                                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="lg:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item, index) => renderNavItem(item))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
