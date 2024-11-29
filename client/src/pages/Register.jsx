import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
    })

    const navigate = useNavigate();

    function handleInputChange(e) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, 
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const fullName = `${formData.firstname} ${formData.lastname}`;

        const payload = {
            ...formData,
            fullName,
        }

        try {
            await axios.post('http://localhost:3500/accounts/register', payload)
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);   
        }
    }

    return (
        <div id="initForms">
            <section className="vh-200 gradient-custom">
                <div className="container-xlg py-5 h-100">
                    <form onSubmit={handleSubmit}>
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-4">
                                <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                                    <div className="card-body p-5 text-center">
                                        <div className="mb-md-5 mt-md-4">
                                            <h2 className="fw-bold mb-4 text-uppercase">Sign Up Now</h2>
                                            <h4 className="fw-bold mb-4">Personal Information</h4>
                                            <div className="row">
                                                <div data-mdb-input-init className="form-outline form-white mb-4 col-md-6">
                                                    <input 
                                                        type="text" 
                                                        id="typeFirstnameX" 
                                                        name="firstname" 
                                                        className="form-control form-control-lg" 
                                                        value={formData.firstname}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="typeFirstnameX">First Name</label>
                                                </div>
                                                <div data-mdb-input-init className="form-outline form-white mb-4 col-md-6">
                                                    <input 
                                                        type="text" 
                                                        id="typeLastnameX" 
                                                        name="lastname" 
                                                        className="form-control form-control-lg" 
                                                        value={formData.lastname}
                                                        onChange={handleInputChange}
                                                        required
                                                    />
                                                    <label className="form-label" htmlFor="typeLastnameX">Last Name</label>
                                                </div>
                                            </div>

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

                                            <div className="mb-4">
                                                <p className="mb-0">Already have an account? 
                                                    <Link to="/login" className="text-white-50 fw-bold">Login</Link>
                                                </p>
                                            </div>

                                            <div className="mb-0">
                                                <button 
                                                    data-mdb-button-init 
                                                    data-mdb-ripple-init 
                                                    className="btn btn-outline-light btn-lg px-5 mb-0" 
                                                    id="submit" 
                                                    type="submit"
                                                >Register</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    )
}

export default Register