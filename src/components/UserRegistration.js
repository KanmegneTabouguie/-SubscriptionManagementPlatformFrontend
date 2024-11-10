import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UserRegistration.css'; // Import the CSS file

const UserRegistration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState(''); // Success message state
    const [errorMessage, setErrorMessage] = useState(''); // Error message state
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/users/register',
                { email, password }
            );
            if (response.data.token) {
                localStorage.setItem('jwtToken', response.data.token);
                setSuccessMessage('Registration successful! Redirecting to login...');
                setErrorMessage(''); // Clear any previous error messages

                // Redirect to the login page after 2 seconds
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setErrorMessage('Registration failed, please try again.');
                setSuccessMessage(''); // Clear any previous success messages
            }
        } catch (error) {
            setErrorMessage('Error registering user, please check your details.');
            setSuccessMessage(''); // Clear any previous success messages
        }
    };

    return (
        <div className="registration-container d-flex justify-content-center align-items-center">
            <div className="card p-5 shadow">
                <div className="text-center mb-4">
                    {/* Logo Text */}
                    <h1 className="logo-text">Ktayl-Consult</h1>
                </div>
                <h2 className="text-center mb-4">User Registration</h2>

                {/* Success and Error Messages */}
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="form-group mb-3">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        </div>
    );
};

export default UserRegistration;
