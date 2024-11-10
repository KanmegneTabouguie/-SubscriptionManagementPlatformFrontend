import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/MySubscriptions.css'; // External CSS file for additional styling

const MySubscriptions = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Memoized fetchSubscriptions function
    const fetchSubscriptions = useCallback(async () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
            setError('You need to log in first.');
            return;
        }

        try {
            const response = await axios.get('https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/stripe/subscriptions', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true',
                },
            });

            if (response.status === 200 && response.data.subscriptions) {
                setSubscriptions(response.data.subscriptions);
            } else {
                setError('Error fetching subscriptions: ' + response.data.message);
            }
        } catch (error) {
            handleAxiosError(error, 'Error fetching subscriptions');
        }
    }, []);

    // Call fetchSubscriptions only once when the component mounts
    useEffect(() => {
        fetchSubscriptions();
    }, [fetchSubscriptions]);

    // Function to handle axios errors
    const handleAxiosError = (error, message) => {
        console.error('Error:', error);
        if (error.response) {
            setError(`${message}: ${error.response.data.message}`);
        } else if (error.request) {
            setError(`${message}: No response received from the server`);
        } else {
            setError(`${message}: ${error.message}`);
        }
    };

    // Logout logic
    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); // Clear token
        navigate('/login'); // Redirect to login
    };

    // Change subscription plan (upgrade/downgrade)
    const changeSubscriptionPlan = async (subscriptionId, newPriceId) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.post(
                'https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/stripe/change-subscription-plan',
                { subscriptionId, newPriceId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'ngrok-skip-browser-warning': 'true',
                    },
                }
            );
            if (response.status === 200) {
                alert('Subscription plan updated successfully.');
                fetchSubscriptions(); // Refresh subscriptions
            }
        } catch (error) {
            handleAxiosError(error, 'Error updating subscription plan');
        }
    };

    // Cancel a subscription
    const cancelSubscription = async (subscriptionId) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.post(`https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/stripe/cancel-subscription/${subscriptionId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            if (response.status === 200) {
                alert('Subscription canceled successfully.');
                fetchSubscriptions(); // Refresh subscriptions
            }
        } catch (error) {
            handleAxiosError(error, 'Error canceling subscription');
        }
    };

    // Pause a subscription
    const pauseSubscription = async (subscriptionId) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.post(`https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/stripe/pause-subscription/${subscriptionId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            if (response.status === 200) {
                alert('Subscription paused successfully.');
                fetchSubscriptions(); // Refresh subscriptions
            }
        } catch (error) {
            handleAxiosError(error, 'Error pausing subscription');
        }
    };

    // Resume a subscription
    const resumeSubscription = async (subscriptionId) => {
        const token = localStorage.getItem('jwtToken');
        try {
            const response = await axios.post(`https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/stripe/resume-subscription/${subscriptionId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': 'true',
                },
            });
            if (response.status === 200) {
                alert('Subscription resumed successfully.');
                fetchSubscriptions(); // Refresh subscriptions
            }
        } catch (error) {
            handleAxiosError(error, 'Error resuming subscription');
        }
    };

    // Functions to upgrade or downgrade a subscription plan
    const upgradeSubscription = (subscriptionId) => {
        const newPriceId = 'price_1QC4tsEP2vmEedR8iNAa9rrZ'; // Premium Plan price ID
        changeSubscriptionPlan(subscriptionId, newPriceId);
    };

    const downgradeSubscription = (subscriptionId) => {
        const newPriceId = 'price_1QC4svEP2vmEedR8OImDG4Ae'; // Basic Plan price ID
        changeSubscriptionPlan(subscriptionId, newPriceId);
    };

    // Render error message if any
    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    // Display message if there are no subscriptions
    if (subscriptions.length === 0) {
        return <p>No active subscriptions.</p>;
    }

    return (
        <div className="subscription-page">
            {/* Header */}
            <header className="header d-flex justify-content-between align-items-center">
            <div className="logo">
        {/* Link the logo to the Subscription Plans page */}
        <Link to="/subscription-plans" className="text-decoration-none text-dark">
            <h2>Ktayl-Consult</h2>
        </Link>
    </div>
                <nav>
                    <Link to="/my-subscriptions" className="btn btn-link">My Subscriptions</Link>
                    <Link to="/payment-history" className="btn btn-link">Payment History</Link>
                </nav>
                <button className="btn btn-danger logout-button" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                </button>
            </header>
{/* Adding space with <br /> */}
<br /><br /><br />
            {/* Main Content */}
            <div className="container mt-5 subscription-container">
                <h1 className="text-center mb-4">My Subscriptions</h1>
                <div id="subscription-list" className="row justify-content-center">
                    {subscriptions.map((sub) => (
                        <div key={sub.id} className="col-md-6">
                            <div className="card subscription-card shadow-sm mb-4">
                                <div className="card-body">
                                    <p><strong>Subscription ID:</strong> {sub.id}</p>
                                    <p><strong>Plan:</strong> {sub.plan}</p>
                                    <p><strong>Status:</strong> <span id={`status-${sub.id}`}>{sub.status}</span></p>
                                    {sub.trial_status === 'trialing' && (
                                        <p><strong>Trial Ends On:</strong> {new Date(sub.trial_end * 1000).toLocaleDateString()}</p>
                                    )}
                                    <div className="button-group d-flex justify-content-between mt-3">
                                        <button className="btn btn-danger" onClick={() => cancelSubscription(sub.id)}>Cancel</button>
                                        <button className="btn btn-warning" onClick={() => pauseSubscription(sub.id)}>Pause</button>
                                        <button className="btn btn-success" onClick={() => resumeSubscription(sub.id)}>Resume</button>
                                        <button className="btn btn-primary" onClick={() => upgradeSubscription(sub.id)}>Upgrade</button>
                                        <button className="btn btn-secondary" onClick={() => downgradeSubscription(sub.id)}>Downgrade</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="footer text-center">
                <p>&copy; 2024 Ktayl-Consult. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default MySubscriptions;
