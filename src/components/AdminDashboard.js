import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const token = localStorage.getItem('jwtToken');
            if (!token) {
                window.location.href = '/admin-login';
                return;
            }
            try {
                const response = await axios.get(
                    'https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/admin/analytics',
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setAnalytics(response.data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            }
        };
        fetchAnalytics();
    }, []);

    if (!analytics) return <p>Loading subscription analytics...</p>;

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            <div className="row">
                <div className="col-md-4">
                    <div className="card bg-light p-3">
                        <h3>Total Subscribers</h3>
                        <p>{analytics.totalSubscribers}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-light p-3">
                        <h3>Total Revenue</h3>
                        <p>${analytics.totalRevenue}</p>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-light p-3">
                        <h3>Failed Payments</h3>
                        <p>{analytics.failedPayments}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
