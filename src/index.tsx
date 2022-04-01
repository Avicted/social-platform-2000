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

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App>
                    <Routes>
                        <Route path="/" element={<About />} />

                        <Route path="/forum" element={<Postlist />} />

                        {/* <Route path="/forum:id">
                        <Post post={posts[0]} />
                    </Route> */}
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
