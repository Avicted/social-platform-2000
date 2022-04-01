import React from 'react'

interface AppProps {}

// App wraps all routes e.g. all pages
export const App: React.FunctionComponent<AppProps> = ({ children }) => {
    return <div className="border-2 border-red-500 container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
}

export default App
