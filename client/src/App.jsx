import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register';
import Reset from './pages/Reset';

function App() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    return (
        <>
            <Router>
                <Routes>
                    <Route 
                        path='/'
                        element={isLoggedIn ? <Home /> : <Login />}
                    />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/reset' element={<Reset />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
