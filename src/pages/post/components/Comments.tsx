interface CommentsProps {}

export const Comments: React.FunctionComponent<CommentsProps> = () => {
    return (
        <div className="mt-24">
            <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex items-center justify-between">
                    <span className="pr-3 bg-white text-lg font-medium text-gray-500">Comments</span>
                </div>
            </div>

            <div className="flex">
                <div>
                    <h4 className="text-lg font-bold">Lorem ipsum</h4>
                    <p className="mt-1">
                        Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis
                        voluptatem. Minus quidem ipsam quia iusto.
                    </p>

                    <div className="mt-6 flex">
                        <div>
                            <h4 className="text-lg font-bold">Lorem ipsum</h4>
                            <p className="mt-1">
                                Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis
                                voluptatem. Minus quidem ipsam quia iusto.
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex">
                        <div className="mr-4 flex-shrink-0"></div>
                        <div>
                            <h4 className="text-lg font-bold">Lorem ipsum</h4>
                            <p className="mt-1">
                                Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis
                                voluptatem. Minus quidem ipsam quia iusto.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
