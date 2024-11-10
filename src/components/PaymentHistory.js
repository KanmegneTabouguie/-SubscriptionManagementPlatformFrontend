import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faFileInvoice, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/PaymentHistory.css';

const PaymentHistory = () => {
    const [invoices, setInvoices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPaymentHistory();
    }, []);

    const fetchPaymentHistory = async () => {
        const token = localStorage.getItem('jwtToken');

        if (!token) {
            setError('You need to log in first.');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.get(
                'https://048d-2a01-e0a-d5d-b2c0-94a9-57f9-ba34-654.ngrok-free.app/api/stripe/payment-history',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'ngrok-skip-browser-warning': 'true'
                    }
                }
            );

            if (response.status === 200 && response.data && Array.isArray(response.data.invoices)) {
                setInvoices(response.data.invoices);
            } else {
                setError('Error fetching payment history: ' + (response.data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error fetching payment history:', error);
            setError('Error fetching payment history.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    };

    const formatDate = (invoiceDate) => {
        if (!invoiceDate) return 'N/A';
        const date = new Date(invoiceDate);
        return date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        });
    };

    if (loading) {
        return <p>Loading payment history...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    if (invoices.length === 0) {
        return <p>No payment history available.</p>;
    }

    return (
        <div className="payment-history-page">
            {/* Header */}
            <header className="header d-flex justify-content-between align-items-center">
                <div className="logo">
                    <Link to="/subscription-plans" className="text-decoration-none text-light">
                        <h2>Ktayl-Consult</h2>
                    </Link>
                </div>
                <nav>
                    <Link to="/my-subscriptions" className="btn btn-link text-light">
                        <FontAwesomeIcon icon={faCreditCard} /> My Subscriptions
                    </Link>
                    <Link to="/payment-history" className="btn btn-link text-light">
                        <FontAwesomeIcon icon={faFileInvoice} /> Payment History
                    </Link>
                </nav>
                <button className="btn btn-danger logout-button" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                </button>
            </header>
            {/* Adding space with <br /> */}
            <br /><br /><br />

            {/* Main Content */}
            <div className="container mt-5 mb-5 payment-history-container">
                <h1 className="text-center mb-4">Payment History</h1>
                <div id="payment-history-list">
                    {invoices.map((invoice) => (
                        <div key={invoice.id} className="invoice-item card p-3 mb-3">
                            <p><strong>Invoice ID:</strong> {invoice.id}</p>
                            <p><strong>Amount Paid:</strong> ${(invoice.amount_paid / 100).toFixed(2)}</p>
                            <p><strong>Status:</strong> {invoice.status}</p>
                            <p><strong>Date:</strong> {formatDate(invoice.invoice_date)}</p>
                            <a href={invoice.download_url} target="_blank" rel="noopener noreferrer">Download Invoice</a>
                            <hr />
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

export default PaymentHistory;
