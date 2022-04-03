import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Postlist } from './pages/postlist/Postlist'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './pages/about/About'
import { Provider } from 'react-redux'
import store from './framework/store'
import { Post } from './pages/post/Post'
import { Categorylist } from './pages/categorylist/Categorylist'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App>
                    <Routes>
                        {/* About page */}
                        <Route path="/" element={<About />} />

                        {/* List of forum categories */}
                        <Route path="/categories" element={<Categorylist />} />

                        {/* List of forum posts in a category */}
                        <Route path="/categories/:categoryId" element={<Postlist />} />

                        {/* A single forum post */}
                        <Route path="/categories/:categoryId/:postId" element={<Post />} />
                    </Routes>
                </App>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
