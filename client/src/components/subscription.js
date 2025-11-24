import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/subscription.css';

const API_URL = 'http://localhost:5000';

function Subscription() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [subscriptionStatus, setSubscriptionStatus] = useState(null);
    const [checkingStatus, setCheckingStatus] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 4000);
    };

    const checkSubscriptionStatus = async (userEmail) => {
        if (!userEmail) return;
        setCheckingStatus(true);
        try {
            const response = await axios.get(`${API_URL}/api/subscription/status/${userEmail}`);
            setSubscriptionStatus(response.data);
        } catch (error) {
            console.error('Error checking subscription:', error);
        } finally {
            setCheckingStatus(false);
        }
    };

    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail) {
            setEmail(storedEmail);
            checkSubscriptionStatus(storedEmail);
        }
    }, []);

    const handleFreeTrial = async () => {
        if (!email) {
            showMessage('Please enter your email address', 'error');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/subscription/create`, {
                email,
                plan_type: 'trial'
            });

            localStorage.setItem('userEmail', email);
            showMessage('Free trial activated! Enjoy 1 day of premium access.', 'success');
            checkSubscriptionStatus(email);
        } catch (error) {
            const errorMsg = error.response?.data?.detail || 'Failed to activate trial';
            showMessage(errorMsg, 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleMonthlySubscription = async () => {
        if (!email) {
            showMessage('Please enter your email address', 'error');
            return;
        }

        setLoading(true);
        try {
            const orderResponse = await axios.post(`${API_URL}/api/payment/create-order`, {
                email,
                amount: 9900
            });

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'mock_key',
                amount: orderResponse.data.amount,
                currency: 'INR',
                name: 'FitSync',
                description: 'Monthly Subscription',
                order_id: orderResponse.data.id,
                handler: async function (response) {
                    try {
                        await axios.post(`${API_URL}/api/payment/verify`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            email
                        });

                        localStorage.setItem('userEmail', email);
                        showMessage('Payment successful! Your subscription is now active.', 'success');
                        checkSubscriptionStatus(email);
                    } catch (error) {
                        showMessage('Payment verification failed', 'error');
                    }
                },
                prefill: {
                    email: email
                },
                theme: {
                    color: '#40A578'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            showMessage('Failed to initiate payment. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    if (checkingStatus) {
        return (
            <div className="subscription-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (subscriptionStatus?.has_subscription) {
        return (
            <div className="subscription-container">
                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}
                <div className="active-subscription-card">
                    <div className="active-header">
                        <div className="shield-icon">✓</div>
                        <h1>Active Subscription</h1>
                        <p>You're all set!</p>
                    </div>
                    <div className="subscription-details">
                        <div className="detail-row">
                            <strong>Email:</strong> {subscriptionStatus.subscription.email}
                        </div>
                        <div className="detail-row">
                            <strong>Plan:</strong> {subscriptionStatus.subscription.plan_type === 'trial' ? '1 Day Free Trial' : 'Monthly Subscription'}
                        </div>
                        <div className="detail-row">
                            <strong>Status:</strong> <span className="status-active">Active</span>
                        </div>
                        <div className="detail-row">
                            <strong>Days Remaining:</strong> {subscriptionStatus.days_remaining} days
                        </div>
                    </div>
                    <button className="btn-dashboard" onClick={() => window.location.href = '/dashboard'}>
                        Go to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (subscriptionStatus?.expired || (subscriptionStatus && !subscriptionStatus.has_subscription && subscriptionStatus.trial_used)) {
        return (
            <div className="subscription-container">
                {message && (
                    <div className={`message ${messageType}`}>
                        {message}
                    </div>
                )}
                <div className="expired-header">
                    <h1>Your Trial Has Ended</h1>
                    <p>Continue your fitness journey with our monthly subscription</p>
                </div>

                <div className="subscription-card single-card">
                    <div className="card-header monthly-header">
                        <div className="card-icon">⚡</div>
                        <h2>Monthly Subscription</h2>
                        <p className="card-subtitle">Unlimited access to all features</p>
                    </div>
                    <div className="card-body">
                        <div className="price-section">
                            <div className="price">₹99<span className="price-period">/month</span></div>
                        </div>

                        <ul className="features-list">
                            <li><span className="check-icon">✓</span> Personalized workout plans</li>
                            <li><span className="check-icon">✓</span> Nutrition tracking & meal plans</li>
                            <li><span className="check-icon">✓</span> Progress analytics & insights</li>
                            <li><span className="check-icon">✓</span> AI-powered fitness chatbot</li>
                            <li><span className="check-icon">✓</span> Water intake tracking</li>
                            <li><span className="check-icon">✓</span> Calorie counter</li>
                        </ul>

                        <div className="email-input-section">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="email-input"
                            />
                        </div>
                    </div>
                    <div className="card-footer">
                        <button
                            onClick={handleMonthlySubscription}
                            disabled={loading}
                            className="btn-subscribe monthly-btn"
                        >
                            {loading ? 'Processing...' : 'Subscribe Now'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="subscription-container">
            {message && (
                <div className={`message ${messageType}`}>
                    {message}
                </div>
            )}
            <div className="subscription-header">
                <h1>Choose Your Plan</h1>
                <p>Start your fitness transformation today</p>
            </div>

            <div className="email-input-main">
                <input
                    type="email"
                    placeholder="Enter your email to get started"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="email-input"
                />
            </div>

            <div className="subscription-cards">
                <div className="subscription-card trial-card">
                    <div className="card-header trial-header">
                        <div className="card-icon">✨</div>
                        <h2>1 Day Free Trial</h2>
                        <p className="card-subtitle">Try before you commit</p>
                    </div>
                    <div className="card-body">
                        <div className="price-section">
                            <div className="price">₹0<span className="price-period">/day</span></div>
                            <p className="price-note">No credit card required</p>
                        </div>

                        <ul className="features-list">
                            <li><span className="check-icon">✓</span> Full access for 24 hours</li>
                            <li><span className="check-icon">✓</span> All premium features</li>
                            <li><span className="check-icon">✓</span> Personalized fitness plans</li>
                            <li><span className="check-icon">✓</span> No automatic billing</li>
                        </ul>

                        <div className="trial-note">
                            After 1 day, your trial will end. Subscribe to continue using FitSync.
                        </div>
                    </div>
                    <div className="card-footer">
                        <button
                            onClick={handleFreeTrial}
                            disabled={loading}
                            className="btn-subscribe trial-btn"
                        >
                            {loading ? 'Activating...' : 'Start Free Trial'}
                        </button>
                    </div>
                </div>

                <div className="subscription-card monthly-card">
                    <div className="popular-badge">POPULAR</div>
                    <div className="card-header monthly-header">
                        <div className="card-icon">⚡</div>
                        <h2>Monthly Subscription</h2>
                        <p className="card-subtitle">Best value for committed users</p>
                    </div>
                    <div className="card-body">
                        <div className="price-section">
                            <div className="price">₹99<span className="price-period">/month</span></div>
                            <p className="price-note savings">Save with longer commitment</p>
                        </div>

                        <ul className="features-list">
                            <li><span className="check-icon">✓</span> 30 days of unlimited access</li>
                            <li><span className="check-icon">✓</span> All premium features included</li>
                            <li><span className="check-icon">✓</span> Personalized workout plans</li>
                            <li><span className="check-icon">✓</span> Nutrition tracking & meal plans</li>
                            <li><span className="check-icon">✓</span> Progress analytics</li>
                            <li><span className="check-icon">✓</span> Priority support</li>
                        </ul>

                        <div className="trial-note">
                            Cancel anytime. No hidden fees.
                        </div>
                    </div>
                    <div className="card-footer">
                        <button
                            onClick={handleMonthlySubscription}
                            disabled={loading}
                            className="btn-subscribe monthly-btn"
                        >
                            {loading ? 'Processing...' : 'Subscribe Now'}
                        </button>
                    </div>
                </div>
            </div>

            <div className="subscription-footer">
                <p>Secure payment powered by Razorpay</p>
                <a href="/">← Back to Home</a>
            </div>
        </div>
    );
}

export default Subscription;
