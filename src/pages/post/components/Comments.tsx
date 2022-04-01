interface CommentsProps {}

export const Comments: React.FunctionComponent<CommentsProps> = () => {
    return (
        <div className="flex mt-24">
            <div>
                <h4 className="text-lg font-bold">Lorem ipsum</h4>
                <p className="mt-1">
                    Repudiandae sint consequuntur vel. Amet ut nobis explicabo numquam expedita quia omnis voluptatem.
                    Minus quidem ipsam quia iusto.
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
    )
}
