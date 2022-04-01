import React from 'react'
import { Footer } from './framework/components/Footer'
import { Navbar } from './framework/components/Navbar'

interface AppProps {}

// App wraps all routes e.g. all pages
export const App: React.FunctionComponent<AppProps> = ({ children }) => {
    return (
        <>
            <Navbar />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>

            <Footer />
        </>
    )
}

export default App
