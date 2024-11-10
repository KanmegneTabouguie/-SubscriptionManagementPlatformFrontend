import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use `useNavigate` instead of `useHistory`
import axios from 'axios';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Replace `useHistory` with `useNavigate`

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/users/admin-login',
                { email, password }
            );
            if (response.data.isAdmin) {
                localStorage.setItem('jwtToken', response.data.token);
                navigate('/admin-dashboard'); // Use `navigate` instead of `history.push`
            } else {
                alert('Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="card p-4 shadow">
                <h2 className="text-center mb-4">Admin Login</h2>
                <form onSubmit={handleLogin}>
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
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
