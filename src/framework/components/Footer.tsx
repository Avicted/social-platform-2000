interface FooterProps {}

export const Footer: React.FunctionComponent<FooterProps> = () => {
    return (
        <div className="flex flex-col text-xl text-center justify-center h-32 pt-24 pb-24">
            <a
                href="https://notasoftwaredevelopmentcompany.com"
                className="text-center text-gray-300 h-full hover:text-black"
            >
                © {new Date().getFullYear()} notasoftwaredevelopmentcompany
                {` `}
            </a>
        </div>
    )
}
