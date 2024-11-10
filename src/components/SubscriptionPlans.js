import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SubscriptionPlans.css'; // Import the CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';

const SubscriptionPlans = () => {
    const navigate = useNavigate(); // For navigation after logout

    useEffect(() => {
        // Load Stripe.js script dynamically when the component mounts
        const stripeScript = document.createElement('script');
        stripeScript.src = 'https://js.stripe.com/v3/';
        stripeScript.async = true;
        document.body.appendChild(stripeScript);
    }, []);

    const createSession = async (priceId, trialPeriodDays = 0) => {
        const token = localStorage.getItem('jwtToken'); // Retrieve JWT token
        const promoCode = document.getElementById('promo-code').value; // Get promo code input

        if (!token) {
            alert('You must be logged in to subscribe.');
            window.location.href = '/login'; // Redirect to login page if not logged in
            return;
        }

        try {
            const response = await axios.post(
                'https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/stripe/create-subscription-session',
                { priceId, trialPeriodDays, promoCode },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach JWT token to the Authorization header
                        'Content-Type': 'application/json',
                    },
                }
            );

            const data = response.data;
            if (data.sessionId) {
                const stripe = window.Stripe('pk_test_51OlrzmEP2vmEedR8qghaKlm2DSD7BVIEudqZfoOFCTJFr7yZ3mGYMcjNKXZkD4rqI11HyFj82tbxgQg3xVkLGlbc00lP7fNETh');
                const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
                if (error) {
                    console.error('Stripe Checkout error:', error.message);
                }
            } else {
                console.error('Failed to create session. No sessionId returned.');
            }
        } catch (error) {
            console.error('Error creating Stripe session:', error.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken'); // Clear token
        navigate('/login'); // Redirect to login
    };

    return (
        <div className="subscription-page">
            {/* Header */}
            <header className="header d-flex justify-content-between align-items-center">
                <div className="logo">
                    <h2>Ktayl-Consult</h2>
                </div>
                <div className="nav-links d-flex">
                    <button className="btn btn-link" onClick={() => navigate('/my-subscriptions')}>
                        <FontAwesomeIcon icon={faUserCircle} /> My Subscriptions
                    </button>
                    <button className="btn btn-link" onClick={() => navigate('/payment-history')}>
                        <FontAwesomeIcon icon={faFileInvoiceDollar} /> Payment History
                    </button>
                </div>
                <button className="btn btn-danger logout-button" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
            </header>

            {/* Adding space with <br /> */}
            <br /><br /><br />

            {/* Main Content */}
            <div className="container mt-5 subscription-container">
                <h1 className="text-center mb-4">Choose Your Subscription Plan</h1>

                {/* Promo Code Input */}
                <div className="promo-code-input mb-4">
                    <label htmlFor="promo-code" className="form-label">Promo Code (Optional):</label>
                    <input type="text" id="promo-code" className="form-control" placeholder="Enter promo code" />
                </div>

                {/* Subscription Plan Cards */}
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="card subscription-card text-center">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Basic Plan</h5>
                                <p className="card-text flex-grow-1">$10/month</p>
                                <button
                                    className="btn btn-primary mt-auto"
                                    onClick={() => createSession('price_1QC4svEP2vmEedR8OImDG4Ae')}
                                >
                                    Choose Basic Plan
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card subscription-card text-center">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Pro Plan</h5>
                                <p className="card-text flex-grow-1">$20/month</p>
                                <button
                                    className="btn btn-primary mt-auto"
                                    onClick={() => createSession('price_1QC4tTEP2vmEedR8WR7ZLOS3')}
                                >
                                    Choose Pro Plan
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card subscription-card text-center">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">Premium Plan</h5>
                                <p className="card-text flex-grow-1">$50/month</p>
                                <p className="card-text">(7-day free trial)</p>
                                <button
                                    className="btn btn-primary mt-auto"
                                    onClick={() => createSession('price_1QC4tsEP2vmEedR8iNAa9rrZ', 7)}
                                >
                                    Choose Premium Plan
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer text-center">
                <p>&copy; 2024 Ktayl-Consult. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SubscriptionPlans;
