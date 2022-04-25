import React from 'react'
import { Footer } from './framework/components/Footer'
import { Navbar } from './framework/components/Navbar'



interface AppProps {}

// App wraps all routes e.g. all pages
export const App: React.FunctionComponent<AppProps> = ({ children }) => {
    return (
        <div className="bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>

            <Footer />
        </div>
    )
}

export default App
