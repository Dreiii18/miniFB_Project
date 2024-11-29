import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Reset() {
    const navigate = useNavigate();
    const [invalidAccount, setInvalidAccount] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        oldpassword: '',
        newpassword: '',
        confirmpassword: '',
    })

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, 
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.newpassword !== formData.confirmpassword) {
            setPasswordMismatch(true);
            return;
        } else {
            setPasswordMismatch(false);
        }

        try {
            await axios.put('http://localhost:3500/accounts/reset-password', formData);
            setInvalidAccount(false);
            navigate('/login')
        } catch (error) {
            console.error('Password reset failed', error);
            setInvalidAccount(true);
        }
    }

    return (
        <div id="initForms">
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                                <div className="card-body p-5 text-center">
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-md-5 mt-md-4">
                                            <h2 className="fw-bold mb-2 text-uppercase">Reset Password</h2>
                                            <p className="text-white-50 mb-5">Please enter your username, old password, and new password!</p>
                                            {invalidAccount && (
                                                <p id="invalid" style={{ display: invalidAccount ? 'block' : 'none '}}>Invalid username or password</p>
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
                                                    id="typeOldPasswordX" 
                                                    name="oldpassword" 
                                                    className="form-control form-control-lg" 
                                                    value={formData.oldpassword}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="typeOldPasswordX">Old Password</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline form-white mb-4">
                                                <input 
                                                    type="password" 
                                                    id="typeNewPasswordX" 
                                                    name="newpassword" 
                                                    className="form-control form-control-lg" 
                                                    value={formData.newpassword}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="typeNewPasswordX">New Password</label>
                                            </div>

                                            <div data-mdb-input-init className="form-outline form-white mb-4">
                                                <input 
                                                    type="password" 
                                                    id="typeConfirmPasswordX" 
                                                    name="confirmpassword" 
                                                    className="form-control form-control-lg" 
                                                    value={formData.confirmpassword}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                                <label className="form-label" htmlFor="typeConfirmPasswordX">Confirm Password</label>
                                            </div>

                                            {passwordMismatch && (
                                                <p style={{ color: 'red' }} className="text-center mb-4">
                                                    Passwords do not match. Please try again.
                                                </p>
                                            )}

                                            <div className="mb-0">
                                                <button 
                                                    data-mdb-button-init 
                                                    data-mdb-ripple-init 
                                                    className="btn btn-outline-light btn-lg px-5 mb-0" 
                                                    id="submit" 
                                                    type="submit"
                                                >Change Password</button>
                                            </div>
                                        </div>
                                    </form>
                                    <div>
                                        <p className="mb-0">Remember your password? 
                                            <Link to="/login" className="text-white-50 fw-bold">Login</Link>
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

export default Reset