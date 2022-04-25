import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Postlist } from './pages/postlist/Postlist'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { About } from './pages/about/About'
import { Provider } from 'react-redux'
import store, { persistor } from './framework/store'
import { Post } from './pages/post/Post'
import { CategoryList } from './pages/categorylist/CategoryList'
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Profile } from './pages/profile/Profile'
import { PersistGate } from 'redux-persist/integration/react'
import { Register } from './pages/register/Register'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                    <App>
                        <Routes>
                            {/* Home page */}
                            <Route path="/" element={<Home />} />

                            {/* About page */}
                            <Route path="/about" element={<About />} />

                            {/* Register page */}
                            <Route path="/register" element={<Register />} />

                            {/* Login page */}
                            <Route path="/login" element={<Login />} />

                            {/* Profile page */}
                            <Route path="/profile" element={<Profile />} />

                            {/* List of forum categories */}
                            <Route path="/categories" element={<CategoryList />} />

                            {/* List of forum posts in a category */}
                            <Route path="/categories/:categoryId" element={<Postlist />} />

                            {/* A single forum post */}
                            <Route path="/categories/:categoryId/:postId" element={<Post />} />
                        </Routes>
                    </App>
                </PersistGate>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,

    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
