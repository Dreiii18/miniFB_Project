import React, { createRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
    const navigate = useNavigate();
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });


    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, 
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/accounts/login', formData);
            const { token, accountData } = response.data;
            const { userId, username, fullname, profilePicture } = accountData;

            localStorage.setItem('userData', JSON.stringify({ userId, username, fullname, profilePicture }));
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('authToken', token);
            setInvalidLogin(false);
            navigate('/home');
        } catch (error) {
            console.error('Login Failed: ', error);
            setInvalidLogin(true);
        }
    }

    return (
        <div id="initForms">
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{borderrRadius : '1rem'}}>
                                <div className="card-body p-5 text-center">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-md-5 mt-md-4 pb-5">
                                            <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                            <p className="text-white-50 mb-5">Please enter your username and password!</p>
                                            {invalidLogin && (
                                                <p id="invalid" style={{display: invalidLogin ? 'block' : 'none'}}>Invalid username or password</p>
                                            )}
                                            <div data-mdb-input-init className="form-outline form-white mb-4">
                                                <input 
                                                    type="text" 
                                                    id="typeUsernameX" 
                                                    name="username" 
                                                    className="form-control form-control-lg"
                                                    value={formData.username}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="typeUsernameX">Username</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline form-white mb-4">
                                                <input 
                                                    type="password" 
                                                    id="typePasswordX" 
                                                    name="password" 
                                                    className="form-control form-control-lg" 
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="typePasswordX">Password</label>
                                            </div>
                                            <p className="small mb-5 pb-lg-2">
                                                <Link to="/reset" className="text-white-50">Forgot password?</Link>
                                            </p>

                                            <button 
                                                data-mdb-button-init 
                                                data-mdb-ripple-init 
                                                className="btn btn-outline-light btn-lg px-5" 
                                                type="submit"
                                            >Login</button>
                                        </div>
                                    </form>
                                    <div>
                                        <p className="mb-0">Don't have an account?
                                            <Link to='/register' className="text-white-50 fw-bold">Sign Up</Link>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login