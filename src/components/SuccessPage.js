import React from 'react';

const SuccessPage = () => {
    return (
        <div className="container text-center mt-5">
            <h1>Subscription Successful!</h1>
            <p>Your subscription has been successfully activated. Thank you for choosing Ktayl-Consult!</p>
            <a href="/my-subscriptions" className="btn btn-primary">Go to My Subscriptions</a>
        </div>
    );
};

export default SuccessPage;
