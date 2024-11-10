import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import UserLogin from './components/UserLogin';
import UserRegistration from './components/UserRegistration';
import SubscriptionPlans from './components/SubscriptionPlans';
import MySubscriptions from './components/MySubscriptions';
import PaymentHistory from './components/PaymentHistory';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegistration />} />
        <Route path="/subscription-plans" element={<SubscriptionPlans />} />
        <Route path="/my-subscriptions" element={<MySubscriptions />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Routes>
    </Router>
  );
}

export default App;


