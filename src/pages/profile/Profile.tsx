import { useSelector } from 'react-redux'
import { AppState } from '../../framework/store/rootReducer'
import { IUser } from '../../models/IUser'

interface ProfileProps {}

export const Profile: React.FunctionComponent<ProfileProps> = ({}) => {
    const user: IUser | undefined = useSelector((state: AppState) => state.login.user)

    if (!user)
        return (
            <div className="mt-12 bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <p className="p-12 ">Please login to view your user information.</p>
            </div>
        )

    return (
        <>
            <div className="mb-8 pb-5 pt-12 border-b border-gray-200">
                <h3 className="text-2xl leading-6 font-medium text-gray-900">User profile</h3>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">User information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details</p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm  font-medium text-gray-500">Id</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.id}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm  font-medium text-gray-500">Username</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.username}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm  font-medium text-gray-500">Created Date</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.createdDate}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm  font-medium text-gray-500">Updated Date</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.updatedDate}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </>
    )
}
