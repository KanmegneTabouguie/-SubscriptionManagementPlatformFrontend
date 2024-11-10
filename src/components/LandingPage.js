import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'; // External CSS for styling

const LandingPage = () => {
  // SEO optimization
  useEffect(() => {
    document.title = "Manage Your Subscriptions with Ease | Ktayl-Consult";
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'Start your free trial to manage subscriptions, optimize your business, and boost revenue. Trusted by thousands.';
    document.head.appendChild(metaDescription);
  }, []);

  return (
    <div>
      {/* Header Section */}
      <header className="landing-header">
        <div className="logo">
          <h1>Ktayl-Consult</h1>
        </div>
        <nav className="navigation">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/subscription-plans">Plans</Link>
        </nav>
      </header>

      {/* Hero Section with stronger value proposition */}
      <section className="hero-section">
        <div className="hero-content">
          <h2>Take Control of Your Subscriptions with Ease</h2>
          <p>With Ktayl-Consult, managing subscriptions and payments has never been easier. Start your free trial today!</p>
          <Link to="/register" className="cta-button">Get Started Today</Link>
          <p className="sub-text mt-3">No credit card required. Cancel anytime.</p>
        </div>
        <img src="https://img.freepik.com/photos-gratuite/gros-plan-personne-faisant-achats-ligne_23-2149159947.jpg" alt="Subscription Management" className="hero-image" />
      </section>

      {/* Real-Time Stats for Trust */}
      <section className="real-time-stats mt-5">
        <div className="row text-center">
          <div className="col-md-4">
            <h4>10,000+</h4>
            <p>Active Users</p>
          </div>
          <div className="col-md-4">
            <h4>$1M+</h4>
            <p>Revenue Generated</p>
          </div>
          <div className="col-md-4">
            <h4>5+ Years</h4>
            <p>Industry Experience</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h3>Our Key Features</h3>
        <div className="features-list">
          <div className="feature-item">
            <h4>User Authentication & Management</h4>
            <p>Secure login and account management with JWT-based authentication.</p>
          </div>
          <div className="feature-item">
            <h4>Manage Subscriptions</h4>
            <p>View, upgrade, or cancel subscriptions directly from the user dashboard.</p>
          </div>
          <div className="feature-item">
            <h4>Free Trials</h4>
            <p>Offer free trials to users to test before committing to a plan.</p>
          </div>
          <div className="feature-item">
            <h4>Payment History & Invoices</h4>
            <p>Access transaction history and download invoices with ease.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h3>What Our Clients Say</h3>
        <div className="testimonials-list">
          <div className="testimonial-item">
            <p>"Ktayl-Consult has completely transformed how we manage our subscriptions. It's simple and efficient!"</p>
            <h4>- Alex Johnson</h4>
          </div>
          <div className="testimonial-item">
            <p>"I love how easy it is to track payments and access my invoices in one place."</p>
            <h4>- Samantha Lee</h4>
          </div>
          <div className="testimonial-item">
            <p>"The best platform for handling subscriptions! The free trial gave me the confidence to sign up for a premium plan."</p>
            <h4>- Michael Smith</h4>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section mt-5">
        <h3>Our Pricing Plans</h3>
        <table className="table table-bordered text-center">
          <thead>
            <tr>
              <th>Plan</th>
              <th>Features</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic</td>
              <td>Access to essential features</td>
              <td>$10/month</td>
            </tr>
            <tr>
              <td>Pro</td>
              <td>Advanced analytics and reporting</td>
              <td>$20/month</td>
            </tr>
            <tr>
              <td>Premium</td>
              <td>Full access to all features</td>
              <td>$50/month</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Sticky CTA for better conversions */}
      <div className="sticky-cta">
        <Link to="/register" className="btn btn-warning">Start Free Trial</Link>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2024 Ktayl-Consult. All rights reserved.</p>
          <nav className="footer-navigation">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/subscription-plans">Plans</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

