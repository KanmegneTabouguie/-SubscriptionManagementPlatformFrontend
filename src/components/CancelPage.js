import React from 'react';

const CancelPage = () => {
    return (
        <div className="container text-center mt-5">
            <h1>Subscription Canceled</h1>
            <p>You canceled the subscription process. If this was a mistake, feel free to choose a plan again.</p>
            <a href="/subscription-plans" className="btn btn-primary">Choose Subscription Plan</a>
        </div>
    );
};

export default CancelPage;
